import { ArrowIcon } from "./ArrowIcon"
import { useEffect } from "react"
import logo from "./assets/logo-480.png"
import "./not-found.css"

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "404 | Page Not Found | Vital Glow"
    // The standalone HTML already has noindex; this also covers Vite's SPA fallback.
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.append(robots) }
    robots.content = "noindex, follow"
    document.querySelector('link[rel="canonical"]')?.remove()
    document.querySelectorAll('script[type="application/ld+json"]').forEach(node => node.remove())
  }, [])
  return <div className="lost-glow">
    <header className="lost-glow__header">
      <a href="/" aria-label="Vital Glow — Go to Home"><img src={logo} width={480} height={412} alt="Vital Glow" /></a>
      <span>THE LOST GLOW</span>
    </header>
    <main className="lost-glow__main">
      <p className="lost-glow__eyebrow">SOMETHING BEAUTIFUL IS MISSING</p>
      <h1>Not all paths<br /><em>lead to a glow.</em></h1>
      <p className="lost-glow__description">This page is no longer here. Let's guide you somewhere beautiful.</p>
      <div className="lost-glow__art" aria-hidden="true">
        <span>404</span>
        <svg viewBox="0 0 400 180" fill="none"><ellipse cx="200" cy="90" rx="180" ry="48" transform="rotate(-15 200 90)" /><path d="M346 34v10m-5-5h10" /></svg>
      </div>
      <p className="lost-glow__caption">AN UNEXPECTED DETOUR</p>
      <nav className="lost-glow__actions" aria-label="Page recovery">
        <a className="lost-glow__primary" href="/">Return to Home <span aria-hidden="true"><ArrowIcon /></span></a>
        <a className="lost-glow__secondary" href="/#product">Explore the Collection</a>
      </nav>
    </main>
    <footer className="lost-glow__signature">VITAL GLOW <span aria-hidden="true">·</span> Simple care. Better skin.</footer>
  </div>
}
