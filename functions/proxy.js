export async function onRequest(context) {
  const request = context.request;
  const h = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key, anthropic-version"
  };
  if (request.method === "OPTIONS") return new Response(null, {headers: h});
  const key = request.headers.get("x-api-key") || "";
  const body = await request.text();
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01"},
    body
  });
  return new Response(await r.text(), {status: r.status, headers: {...h, "Content-Type": "application/json"}});
}
