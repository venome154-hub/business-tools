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

## Google Search Console

After deployment, open `https://your-domain.com/sitemap.xml` and confirm it lists the home page and `/invoice-generator`. Add that sitemap in Google Search Console, then use URL Inspection for `/invoice-generator` to request indexing. Verify the property using a domain or URL-prefix property before submitting.

## Roadmap

- Quote Generator
- Receipt Generator
- Profit Margin Calculator
- Markup Calculator
- More SEO landing pages
- Analytics
- Ad monetization
- Affiliate integrations
