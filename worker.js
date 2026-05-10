export default {
  async fetch(req) {
    const h = {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type,x-api-key,anthropic-version"};
    if (req.method === "OPTIONS") return new Response(null, {headers:h});
    if (req.method !== "POST") return new Response("OK", {status:200,headers:h});
    const key = req.headers.get("x-api-key") || "";
    const body = await req.text();
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST",
      headers:{"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
      body
    });
    return new Response(await r.text(), {status:r.status, headers:{...h,"Content-Type":"application/json"}});
  }
};
