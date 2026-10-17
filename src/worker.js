// serves the page and /api/liq, the liquidation timeline from liquidate.fun (used with permission).
// responses are cached for a minute so we never hammer their api.
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/liq") {
      const c = url.searchParams.get("c") === "sol" ? "sol" : "btc";
      const cacheKey = new Request(`https://liq-cache/${c}`);
      const cache = caches.default;
      const hit = await cache.match(cacheKey);
      if (hit) {
        const h = new Response(hit.body, hit);
        h.headers.set("access-control-allow-origin", "*");
        return h;
      }
      try {
        const r = await fetch(`https://liquidate.fun/api/timeline?c=${c}`, {
          headers: { "user-agent": "owlchainlabs rekt-radio (github.com/OwlChainLabs/rekt-radio)" },
        });
        if (!r.ok) throw new Error(String(r.status));
        const j = await r.json();
        const body = { coin: j.coin, now: j.now, buckets: j.buckets || [], highlights: j.highlights || [] };
        const res = Response.json(body, { headers: { "cache-control": "public, max-age=60", "access-control-allow-origin": "*" } });
        ctx.waitUntil(cache.put(cacheKey, res.clone()));
        return res;
      } catch {
        return Response.json({ error: "liquidation feed unavailable" }, { status: 502, headers: { "cache-control": "no-store" } });
      }
    }
    return env.ASSETS.fetch(request);
  },
};
