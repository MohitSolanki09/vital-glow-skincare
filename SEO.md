# Vital Glow production SEO

Build with `pnpm build`, then run `node scripts/verify-seo.mjs` to check the actual production HTML and public assets. Metadata is emitted by Vite before React runs. The canonical homepage is https://vitalglow111.com/; section hashes are not separate pages.

Production builds override the old Figma launch-only indexing setting. Development and Netlify non-production contexts retain noindex and disallow crawling. Do not deploy a development/preview build as production. A manually published staging copy of a production build must have indexing disabled by its host.

The social image is an unchanged copy of the existing 1145 × 1374 Acne Fight poster, not a newly generated product visual. Social platforms may crop this portrait image differently. The Organization logo is an unchanged copy of the real Vital Glow logo. No product offers, ratings or certification claims are included in JSON-LD.

## Netlify checklist after deployment

- Set `vitalglow111.com` as the primary production domain and configure the `www` alias in Domain management. Verify Netlify's automatic primary-domain redirect before adding any custom redirect. See https://docs.netlify.com/domains/manage-domains/manage-multiple-domains/.
- Verify DNS, the HTTPS certificate, HTTP-to-HTTPS and www-to-apex redirects in the actual deployment. These are not established by repository metadata.
- Verify production responses have no `X-Robots-Tag: noindex` header. Check homepage, robots.txt, sitemap.xml and both `/social/` images return the expected files with successful HTTP responses.
- Keep deploy previews and branch deployments excluded from indexing. Audit any dashboard-configured headers/redirects that are not represented in this repository.
- Verify ownership in Google Search Console, submit `https://vitalglow111.com/sitemap.xml`, and inspect the rendered homepage using URL Inspection. Indexing and rankings are not guaranteed.

The site remains a client-rendered single-page React application. Existing headings, copy and links are present in the rendered DOM; crawlers must execute JavaScript to read the body. Google supports this rendering workflow: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics. No SSR migration is warranted solely by this audit. Search Console rendering and real-user LCP/CLS/INP still require deployed-site checks; local bundle size and browser smoke checks do not establish field Core Web Vitals scores.
