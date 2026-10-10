import gmpStamp from "./assets/gmp-certified.png"
import logoImg from "./assets/logo-480.png"
import isoStamp from "./assets/iso-9001-2015-certified.png"
import fdaStamp from "./assets/fda-approved.png"
import { useEffect, useRef, useState } from "react"
import { useReveal } from "./useMotion"
import "./footer.css"

const certifications = [
  { src: gmpStamp, alt: "GMP Certified - Good Manufacturing Practice", label: "GMP CERTIFIED", className: "" },
  { src: isoStamp, alt: "ISO 9001:2015 Certified Company", label: "ISO 9001:2015", className: "vg-footer__stamp--iso" },
  { src: fdaStamp, alt: "FDA Approved", label: "FDA APPROVED", className: "" },
]
const links = [["Home", "home"], ["About", "about"], ["Our Product", "product"], ["Why Vital Glow", "why-vital-glow"], ["Contact", "premium-contact"]]

export function Footer() {
  const { ref, visible } = useReveal(0.04)
  const footerRef = useRef<HTMLElement>(null)
  const [docked, setDocked] = useState(false)
  const [bottom, setBottom] = useState(20)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const footer = footerRef.current
      if (!footer) return
      setDocked(footer.getBoundingClientRect().top < window.innerHeight - 80)
      // Keep the floating shortcut above visible form actions, without changing forms.
      let offset = 20
      document.querySelectorAll<HTMLButtonElement>('main button[type="submit"]').forEach(button => {
        const rect = button.getBoundingClientRect()
        if (rect.right > window.innerWidth - 88 && rect.top < window.innerHeight - 12 && rect.bottom > window.innerHeight - 88) {
          offset = Math.max(offset, window.innerHeight - rect.top + 16)
        }
      })
      setBottom(offset)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule) }
  }, [])
  const reveal = `reveal ${visible ? "visible" : ""}`
  return (
    <footer ref={footerRef} className="vg-footer" aria-label="Vital Glow footer">
      <div ref={ref} className="page-container">
        <div className={`vg-footer__brand ${reveal}`}>
          <div><a href="#home" className="vg-footer__logo" aria-label="Vital Glow — Go to Home"><img src={logoImg} width={480} height={412} alt="Vital Glow" loading="lazy" decoding="async" /></a><p>Simple care. Better skin.</p></div>
          <h2>YOUR DAILY CARE,<br /><em>THOUGHTFULLY MADE.</em></h2>
        </div>
        <div className={`vg-footer__information ${reveal} d1`}>
          <nav aria-label="Footer navigation"><h3>EXPLORE</h3><div className="vg-footer__links">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}<span aria-hidden="true">↗</span></a>)}</div></nav>
          <div><h3>GET IN TOUCH</h3><dl className="vg-footer__contact"><div><dt>EMAIL</dt><dd><a href="mailto:vitalglow111@gmail.com">vitalglow111@gmail.com</a></dd></div><div><dt>PHONE</dt><dd><a href="tel:+919726976262">+91 97269 76262</a></dd></div><div><dt>ADDRESS</dt><dd><address>Lalpur Main Road<br />Near BOB ATM, Dared<br />Jamnagar - 361012</address></dd></div></dl>
            <div className="vg-footer__social" role="group" aria-label="Social media">
              <a className="vg-footer__social-link" href="https://www.instagram.com/vital_glow_2026"
                target="_blank" rel="noopener noreferrer" aria-label="Visit Vital Glow on Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <span className="vg-footer__social-link" role="img" aria-label="Facebook link coming soon" title="Facebook link coming soon">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M14 22v-9h3l.5-4H14V6.5c0-1.1.3-1.5 1.5-1.5H18V1.4A25 25 0 0 0 14.8 1C11.6 1 10 2.9 10 6v3H7v4h3v9h4Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className={`vg-footer__quality ${reveal} d2`}><h3><span aria-hidden="true">✦</span> QUALITY YOU CAN TRUST</h3>{certifications.length > 0 && <div className="vg-footer__stamps">{certifications.map((stamp, index) => <figure key={stamp.src} className={`${reveal} d${index + 1}`}><img className={stamp.className} src={stamp.src} alt={stamp.alt} loading="lazy" /><figcaption>{stamp.label}</figcaption></figure>)}</div>}</div>
      </div>
      <div className="vg-footer__credit"><span aria-hidden="true">✦</span><p>Marketing By <strong>Kanaiya Medical</strong></p></div>
      <div className="page-container vg-footer__bottom"><p>© 2026 Vital Glow. All rights reserved.</p><a href="#home">BACK TO TOP <span aria-hidden="true">↑</span></a></div>
      <a className={`vg-whatsapp ${docked ? "vg-whatsapp--docked" : ""}`} style={docked ? undefined : { bottom: `calc(${bottom}px + env(safe-area-inset-bottom, 0px))` }} href={`https://wa.me/919726976262?text=${encodeURIComponent("Hello Vital Glow, I would like to know more about your products.")}`} aria-label="Chat with Vital Glow on WhatsApp" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.15 1.6 5.96L.02 24l6.26-1.64a11.93 11.93 0 0 0 5.77 1.47h.01C18.63 23.83 24 18.48 24 11.9c0-3.19-1.24-6.18-3.48-8.42ZM12.06 21.8a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.24-.38a9.9 9.9 0 0 1-1.52-5.24c0-5.46 4.45-9.91 9.91-9.91a9.84 9.84 0 0 1 7.01 2.91 9.84 9.84 0 0 1 2.89 7.01c0 5.46-4.46 9.86-9.92 9.86Zm5.44-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" /></svg>
      </a>
    </footer>
  )
}
