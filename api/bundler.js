const SUPPORTED_CHAIN_IDS = new Set(['1', '10', '137', '8453', '42161']);
const ALLOWED_METHODS = new Set([
  'pimlico_getUserOperationGasPrice',
  'eth_estimateUserOperationGas',
  'eth_sendUserOperation',
  'eth_getUserOperationReceipt',
]);
const ENTRY_POINT_V6 = '0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789';
const BICONOMY_EXECUTE_SELECTOR = '0xb61d27f6';
const MAX_REQUEST_BYTES = 64 * 1024;
const MAX_CALL_DATA_BYTES = 8 * 1024;
const MAX_SIGNATURE_BYTES = 2 * 1024;

function jsonResponse(payload, status = 200) {
  return Response.json(payload, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function rpcError(id, code, message, status = 400) {
  return jsonResponse({ jsonrpc: '2.0', id: id ?? null, error: { code, message } }, status);
}

function isAddress(value) {
  return typeof value === 'string' && /^0x[0-9a-fA-F]{40}$/.test(value);
}

function isHex(value, maxBytes) {
  return (
    typeof value === 'string' &&
    /^0x(?:[0-9a-fA-F]{2})*$/.test(value) &&
    (value.length - 2) / 2 <= maxBytes
  );
}

function isQuantity(value) {
  return typeof value === 'string' && /^0x(?:0|[1-9a-fA-F][0-9a-fA-F]*)$/.test(value);
}

function validateUserOperation(userOperation, requireSignature) {
  if (!userOperation || typeof userOperation !== 'object' || Array.isArray(userOperation)) {
    return 'UserOperation must be an object.';
  }
  if (!isAddress(userOperation.sender)) return 'UserOperation sender is invalid.';
  for (const field of [
    'nonce',
    'callGasLimit',
    'verificationGasLimit',
    'preVerificationGas',
    'maxFeePerGas',
    'maxPriorityFeePerGas',
  ]) {
    if (!isQuantity(userOperation[field])) return `UserOperation ${field} is invalid.`;
  }
  if (userOperation.initCode !== '0x') {
    return 'Hosted bundler only supports already-deployed recovery accounts.';
  }
  if (userOperation.paymasterAndData !== '0x') {
    return 'Hosted bundler does not accept sponsored UserOperations.';
  }
  if (!isHex(userOperation.callData, MAX_CALL_DATA_BYTES)) {
    return 'UserOperation callData is invalid or too large.';
  }
  if (!userOperation.callData.toLowerCase().startsWith(BICONOMY_EXECUTE_SELECTOR)) {
    return 'Hosted bundler only accepts Biconomy execute recovery calls.';
  }
  if (!isHex(userOperation.signature, MAX_SIGNATURE_BYTES)) {
    return 'UserOperation signature is invalid or too large.';
  }
  if (requireSignature && userOperation.signature === '0x') {
    return 'A signed UserOperation is required.';
  }
  return null;
}

function validateRpcRequest(body) {
  const id = body && !Array.isArray(body) ? body.id : null;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { error: rpcError(id, -32600, 'JSON-RPC batches are not supported.') };
  }
  if (body.jsonrpc !== '2.0' || !['number', 'string'].includes(typeof body.id)) {
    return { error: rpcError(id, -32600, 'Invalid JSON-RPC request.') };
  }
  if (!ALLOWED_METHODS.has(body.method)) {
    return { error: rpcError(id, -32601, 'RPC method is not available.', 403) };
  }
  if (!Array.isArray(body.params)) {
    return { error: rpcError(id, -32602, 'JSON-RPC params must be an array.') };
  }

  if (body.method === 'pimlico_getUserOperationGasPrice') {
    if (body.params.length !== 0) {
      return { error: rpcError(id, -32602, 'Gas-price request does not accept params.') };
    }
    return { request: body };
  }

  if (body.method === 'eth_getUserOperationReceipt') {
    if (body.params.length !== 1 || !/^0x[0-9a-fA-F]{64}$/.test(body.params[0])) {
      return { error: rpcError(id, -32602, 'A valid UserOperation hash is required.') };
    }
    return { request: body };
  }

  if (
    body.params.length !== 2 ||
    typeof body.params[1] !== 'string' ||
    body.params[1].toLowerCase() !== ENTRY_POINT_V6
  ) {
    return { error: rpcError(id, -32602, 'Only EntryPoint v0.6 is supported.') };
  }
  const validationError = validateUserOperation(
    body.params[0],
    body.method === 'eth_sendUserOperation'
  );
  if (validationError) return { error: rpcError(id, -32602, validationError) };
  return { request: body };
}

export async function handleBundlerRequest(
  request,
  { apiKey = process.env.PIMLICO_API_KEY, fetchImpl = fetch } = {}
) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: { message: 'Method not allowed.' } }, 405);
  }

  const chainId = new URL(request.url).searchParams.get('chainId');
  if (!SUPPORTED_CHAIN_IDS.has(chainId)) {
    return rpcError(null, -32602, 'Unsupported chain ID.');
  }
  if (typeof apiKey !== 'string' || apiKey.trim() === '') {
    return rpcError(null, -32000, 'Hosted bundler is not configured.', 503);
  }

  const contentLength = Number(request.headers.get('content-length') || '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return rpcError(null, -32600, 'Request body is too large.', 413);
  }

  let bodyText;
  try {
    bodyText = await request.text();
  } catch (_) {
    return rpcError(null, -32700, 'Unable to read request body.');
  }
  if (new TextEncoder().encode(bodyText).length > MAX_REQUEST_BYTES) {
    return rpcError(null, -32600, 'Request body is too large.', 413);
  }

  let body;
  try {
    body = JSON.parse(bodyText);
  } catch (_) {
    return rpcError(null, -32700, 'Invalid JSON request body.');
  }
  const validated = validateRpcRequest(body);
  if (validated.error) return validated.error;

  const secret = apiKey.trim();
  const upstreamUrl = `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${encodeURIComponent(secret)}`;
  let upstream;
  try {
    upstream = await fetchImpl(upstreamUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validated.request),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (_) {
    return rpcError(body.id, -32000, 'Bundler service is temporarily unavailable.', 502);
  }

  let responseText;
  try {
    responseText = (await upstream.text())
      .replaceAll(secret, '[redacted]')
      .replaceAll(encodeURIComponent(secret), '[redacted]');
    const parsed = JSON.parse(responseText);
    return jsonResponse(parsed, upstream.ok ? 200 : upstream.status);
  } catch (_) {
    return rpcError(body.id, -32000, 'Bundler returned an invalid response.', 502);
  }
}

export default { fetch: handleBundlerRequest };
