import assert from "node:assert/strict"
import { readFileSync, existsSync } from "node:fs"
import { resolve } from "node:path"

const directory = resolve(process.argv[2] || "dist")
const preview = process.argv.includes("--preview")
const html = readFileSync(resolve(directory, "index.html"), "utf8")
const origin = "https://vitalglow111.com"
const title = "Vital Glow | Thoughtful Skincare & Daily Skin Care"
const description = "Discover Vital Glow skincare, thoughtfully developed for your daily routine. Explore our products, brand philosophy, and upcoming skincare collection."
const decode = value => value.replaceAll("&amp;", "&")
const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) =>
  Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)])))
function meta(key, value) {
  const matches = metas.filter(item => item.name === key || item.property === key)
  assert.equal(matches.length, 1, `Exactly one ${key}`)
  if (value !== undefined) assert.equal(matches[0].content, value, key)
  return matches[0].content
}
assert.match(html, /<html lang="en">/)
const titles = [...html.matchAll(/<title>(.*?)<\/title>/gs)]
assert.equal(titles.length, 1)
assert.equal(decode(titles[0][1]), title)
meta("description", description)
meta("viewport", "width=device-width, initial-scale=1.0")
meta("robots", preview ? "noindex, nofollow" : "index, follow, max-image-preview:large")
assert.equal((html.match(/rel="canonical"/g) || []).length, 1)
assert.match(html, /rel="canonical" href="https:\/\/vitalglow111\.com\/"/)
meta("og:type", "website")
meta("og:site_name", "Vital Glow")
meta("og:url", `${origin}/`)
meta("og:title", title)
meta("og:description", description)
meta("twitter:title", title)
meta("twitter:description", description)
meta("twitter:card", "summary_large_image")
const social = meta("og:image")
meta("twitter:image", social)
assert.ok(meta("og:image:alt"))
assert.ok(meta("twitter:image:alt"))
function asset(url) {
  const parsed = new URL(url, origin)
  assert.equal(parsed.origin, origin)
  assert.ok(existsSync(resolve(directory, parsed.pathname.slice(1))), url)
}
asset(social)
const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
assert.equal(scripts.length, 1)
const data = JSON.parse(scripts[0][1])
assert.equal(data["@context"], "https://schema.org")
const [organization, website] = data["@graph"]
assert.equal(organization["@type"], "Organization")
assert.equal(organization.telephone, "+91 97269 76262")
assert.equal(organization.email, "vitalglow111@gmail.com")
assert.equal(organization.url, `${origin}/`)
assert.equal(website.url, `${origin}/`)
assert.equal(website.publisher["@id"], organization["@id"])
asset(organization.logo)
const favicon = html.match(/<link rel="icon"[^>]*href="([^"]+)"/)
assert.ok(favicon)
asset(favicon[1])
const robots = readFileSync(resolve(directory, "robots.txt"), "utf8")
assert.equal(robots.trim(), preview ? "User-agent: *\nDisallow: /" : `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml`)
const sitemap = readFileSync(resolve(directory, "sitemap.xml"), "utf8")
assert.equal((sitemap.match(/<loc>/g) || []).length, 1)
assert.ok(sitemap.includes(`<loc>${origin}/</loc>`))
assert.ok(!sitemap.includes("lastmod"))
if (!preview) assert.ok(!html.includes("noindex"))
console.log(`SEO checks passed (${preview ? "preview excluded" : "production indexable"}): metadata, JSON-LD, canonical, robots, sitemap, image and favicon files.`)
