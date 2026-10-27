import assert from 'node:assert/strict';
import test from 'node:test';
import { handleBundlerRequest } from '../api/bundler.js';

const endpoint = 'https://rescuer.example/api/bundler?chainId=8453';
const entryPoint = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';

function request(body, url = endpoint) {
  return new Request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function userOperation(overrides = {}) {
  return {
    sender: '0x1111111111111111111111111111111111111111',
    nonce: '0x0',
    initCode: '0x',
    callData: '0xb61d27f6' + '00'.repeat(96),
    callGasLimit: '0x493e0',
    verificationGasLimit: '0x493e0',
    preVerificationGas: '0xc350',
    maxFeePerGas: '0x3b9aca00',
    maxPriorityFeePerGas: '0x3b9aca00',
    paymasterAndData: '0x',
    signature: '0x' + '11'.repeat(65),
    ...overrides,
  };
}

test('rejects general-purpose RPC methods without contacting Pimlico', async () => {
  let called = false;
  const response = await handleBundlerRequest(
    request({ jsonrpc: '2.0', id: 1, method: 'eth_sendRawTransaction', params: ['0x00'] }),
    {
      apiKey: 'server-secret',
      fetchImpl: async () => {
        called = true;
        return new Response('{}');
      },
    }
  );
  assert.equal(response.status, 403);
  assert.equal(called, false);
});

test('fails closed when the secret or supported chain is missing', async () => {
  const body = { jsonrpc: '2.0', id: 1, method: 'pimlico_getUserOperationGasPrice', params: [] };
  const missingSecret = await handleBundlerRequest(request(body), { apiKey: '' });
  const unsupportedChain = await handleBundlerRequest(
    request(body, 'https://rescuer.example/api/bundler?chainId=999'),
    { apiKey: 'server-secret' }
  );
  assert.equal(missingSecret.status, 503);
  assert.equal(unsupportedChain.status, 400);
});

test('proxies an allowed request without returning the secret', async () => {
  let upstreamUrl = '';
  const response = await handleBundlerRequest(
    request({ jsonrpc: '2.0', id: 1, method: 'pimlico_getUserOperationGasPrice', params: [] }),
    {
      apiKey: 'server-secret',
      fetchImpl: async (url) => {
        upstreamUrl = String(url);
        return Response.json({ jsonrpc: '2.0', id: 1, result: { fast: {} } });
      },
    }
  );
  assert.equal(response.status, 200);
  assert.match(upstreamUrl, /apikey=server-secret/);
  assert.doesNotMatch(await response.text(), /server-secret/);
});

test('accepts the recovery UserOperation shape', async () => {
  const response = await handleBundlerRequest(
    request({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_sendUserOperation',
      params: [userOperation(), entryPoint],
    }),
    {
      apiKey: 'server-secret',
      fetchImpl: async () =>
        Response.json({ jsonrpc: '2.0', id: 1, result: '0x' + '22'.repeat(32) }),
    }
  );
  assert.equal(response.status, 200);
});

test('rejects sponsored, deployment, and non-recovery UserOperations', async () => {
  for (const operation of [
    userOperation({ paymasterAndData: '0x12' }),
    userOperation({ initCode: '0x12' }),
    userOperation({ callData: '0x12345678' }),
  ]) {
    const response = await handleBundlerRequest(
      request({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_sendUserOperation',
        params: [operation, entryPoint],
      }),
      { apiKey: 'server-secret' }
    );
    assert.equal(response.status, 400);
  }
});
