# Business Tools

First MVP: Free Invoice Generator.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Import this repository into Vercel. No environment variables are required for the MVP.

For canonical metadata, `sitemap.xml`, and `robots.txt`, set `NEXT_PUBLIC_SITE_URL` in Vercel to the production site origin (for example, `https://your-domain.com`). If it is not set, the app uses Vercel's production URL when available; local development falls back to `http://localhost:3000`.

## Environment

Copy `.env.example`. `NEXT_PUBLIC_SITE_URL` is optional; metadata falls back to `https://www.biztoolsbox.online`.

`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` add the Search Console meta tags on every page. Leave them unset and the tags are omitted.

`INDEXNOW_KEY` is the public IndexNow key. It must match `public/<key>.txt`. Set the same value as the GitHub Actions secret `INDEXNOW_KEY`. The production deploy workflow pings IndexNow after a successful Production deployment and does not fail the deploy if IndexNow is down. Preview deployments do not ping.

```bash
INDEXNOW_KEY=your-key node scripts/indexnow-ping.mjs --dry-run
```

## Google Search Console

After deployment, open `https://www.biztoolsbox.online/sitemap.xml` and submit it in Google Search Console. Use the verification variables above, or verify the domain another way, before requesting indexing.

## Roadmap

- Quote Generator
- Receipt Generator
- Profit Margin Calculator
- Markup Calculator
- More SEO landing pages
- Analytics
- Ad monetization
- Affiliate integrations
