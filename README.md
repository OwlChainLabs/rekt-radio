# 📻 rekt radio

hear traders get rekt. the last 24 hours of liquidations, played as a track.

**try it: [rekt.owlchainlabs.xyz](https://rekt.owlchainlabs.xyz)**

- red bars hang down: longs liquidated, played as deep bass hits
- green bars stand up: shorts liquidated, played as high notes
- whale wipeouts over $1M hit a drop and a banner while the beat keeps going
- btc and sol, refreshed every minute

## data

liquidation data comes from [liquidate.fun](https://liquidate.fun) by [@WhiteWhaleLabs](https://x.com/WhiteWhaleLabs), used with their permission. it covers hyperliquid, binance, bybit, okx and more. the worker caches every response for a minute.

## run it yourself

a static page in `public/` plus a tiny cloudflare worker (`src/worker.js`) for `/api/liq`.

```bash
git clone https://github.com/OwlChainLabs/rekt-radio
cd rekt-radio
npx wrangler deploy
```

no api keys needed.

## license

MIT · built by [@OwlChainLabs](https://x.com/OwlChainLabs) · for fun, not financial advice
