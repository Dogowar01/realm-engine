export async function onRequest(context) {
  const request = context.request;
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key, anthropic-version',
    }});
  }
  const apiKey = request.headers.get('x-api-key') || '';
  const body = await request.text();
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    body,
  });
  return new Response(await res.text(), { status: res.status, headers: {
    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
  }});
}
