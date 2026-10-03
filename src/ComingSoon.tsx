import { useState } from "react"
import { useReveal } from "./useMotion"
import { ComingSoonProductCard, type UpcomingProduct } from "./ComingSoonProductCard"
import shampoo from "./assets/vital-glow-shampoo.png"
import onionOil from "./assets/vital-glow-onion-hair-oil.png"
import hairOil from "./assets/vital-glow-hair-oil.png"
import "./coming-soon.css"

const products: UpcomingProduct[] = [
  { name: "Shampoo", subtitle: "A new chapter in hair care", image: shampoo, width: 1086, height: 1448 },
  { name: "Onion Hair Oil", subtitle: "Your next hair-care ritual", image: onionOil, width: 1024, height: 1536 },
  { name: "Hair Oil", subtitle: "More care, coming your way", image: hairOil, width: 1086, height: 1448 },
]

export function ComingSoonSection() {
  const header = useReveal(0.08)
  const signup = useReveal(0.08)
  const [email, setEmail] = useState("")
  const [validated, setValidated] = useState(false)
  const reveal = `reveal ${header.visible ? "visible" : ""}`
  return (
    <section id="coming-soon" className="launch-section section-space" aria-labelledby="launch-title">
      <div className="page-container">
        <div ref={header.ref} className="launch-header">
          <span className={`launch-eyebrow ${reveal}`}>Coming Soon</span>
          <h2 id="launch-title" className={`${reveal} d1`}>More Care.<br /><em>More Innovation.</em></h2>
          <p className={`${reveal} d2`}>We're expanding the Vital Glow range. New solutions, same commitment to gentle, effective skincare that works.</p>
        </div>
        <div className="launch-products">{products.map((product, index) => <ComingSoonProductCard key={product.name} product={product} index={index} />)}</div>
        <div ref={signup.ref} className={`launch-signup reveal ${signup.visible ? "visible" : ""}`}>
          <div><p className="launch-signup-kicker">Be first to know</p><h3>Get launch updates from Vital Glow.</h3><p className="launch-signup-copy">Be the first to know when new products launch.</p></div>
          <div>
            <form onSubmit={event => { event.preventDefault(); setValidated(true) }}>
              <label className="sr-only" htmlFor="updates-email">Email address for launch updates</label>
              <input id="updates-email" name="email" type="email" autoComplete="email" required placeholder="your@email.com" aria-describedby="updates-note" value={email} onChange={event => { setEmail(event.target.value); setValidated(false) }} />
              <button type="submit" className="btn-lift">Stay Updated <span aria-hidden="true">↗</span></button>
            </form>
            <p id="updates-note" className="launch-status" role="status">{validated ? "Email validated locally. It has not been sent; launch updates are not connected yet." : "Launch updates are not connected yet. This form only validates your email."}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
