import { useReveal } from "./useMotion"
import productImg from "./assets/product.png"
import editorialPoster from "./assets/acne-fight-water-poster.png"
import logoImg from "./assets/logo-64.png"
import "./editorial.css"

const benefits = [
  { icon: "✧", title: "Thoughtful Ingredients", text: "Salicylic acid, licorice extract and niacinamide, together in one daily cleanser." },
  { icon: "♧", title: "A Gentler Routine", text: "A sulphate-free and paraben-free formula, made for your everyday ritual." },
  { icon: "◉", title: "Targeted Daily Care", text: "Meet Acne Fight: cleansing care for oily, combination and acne-prone skin." },
  { icon: "❀", title: "Carefully Considered", text: "Quality, care and innovation at the heart of every Vital Glow formula." },
]

function Arrow() { return <span aria-hidden="true">↗</span> }

export function ProductOrbitSection() {
  const { ref, visible } = useReveal(0.08)
  return (
    <section id="why-vital-glow" className="vg-orbit-section" aria-labelledby="vg-orbit-title">
      <div ref={ref} className="vg-orbit-stage">
        <div className="vg-orbit vg-orbit-outer" aria-hidden="true" />
        <div className="vg-orbit vg-orbit-inner" aria-hidden="true" />
        <div className={`vg-orbit-copy reveal ${visible ? "visible" : ""}`}>
          <span className="vg-review-pill"><span aria-hidden="true">✦ ✦ ✦</span> CARE IN EVERY DROP</span>
          <h2 id="vg-orbit-title"><em>Why Choose</em><br />Our Product?</h2>
          <p>Thoughtful ingredients. A simple daily ritual.<br />Discover skincare made with your glow in mind.</p>
          <a className="vg-dark-cta btn-lift" href="#product">Explore Acne Fight <Arrow /></a>
        </div>
        {benefits.map((benefit, index) => (
          <article key={benefit.title} className={`vg-orbit-card vg-orbit-card-${index + 1} reveal d${index + 1} ${visible ? "visible" : ""}`}>
            <span className="vg-card-icon" aria-hidden="true">{benefit.icon}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SkincareEditorialSection() {
  const { ref, visible } = useReveal(0.08)
  return (
    <section className="vg-editorial-section" aria-labelledby="vg-editorial-title">
      <div ref={ref} className={`vg-editorial reveal ${visible ? "visible" : ""}`}>
        <div className="vg-editorial-photo">
          <img src={editorialPoster} width={1145} height={1374} loading="lazy" alt="Vital Glow Acne Fight face wash with blue water, leaves and stones" />
          <div className="vg-photo-copy">
            <h2 id="vg-editorial-title">Our Special Skincare</h2>
            <p>A thoughtful daily cleanse.<br />Discover your Vital Glow ritual.</p>
          </div>
          <div className="vg-photo-pills"><span>Daily Cleanser</span><span>Niacinamide</span><span>Salicylic Acid</span><span>Licorice Extract</span></div>
        </div>
        <div className="vg-editorial-center">
          <div className="vg-editorial-statement">
            <span className="vg-outline-pill">THE BENEFITS <Arrow /></span>
            <p>Thoughtful Care.<br />A Fresh Start.<br /><span>Your Daily Glow.</span></p>
          </div>
          <div className="vg-wordmark-panel"><div className="vg-wordmark">Vital Glow</div></div>
        </div>
        <div className="vg-editorial-right">
          <div className="vg-formula-panel">
            <span className="vg-outline-pill">WHY VITAL GLOW <Arrow /></span>
            <div className="vg-formula-values"><div><strong>1%</strong><span>Salicylic Acid</span></div><div><strong>2%</strong><span>Niacinamide</span></div></div>
          </div>
          <div className="vg-editorial-visual">
            <div className="vg-product-circle"><img src={productImg} width={1086} height={1448} loading="lazy" alt="Acne Fight face wash" /></div>
            <span className="vg-circle-accent"><img src={logoImg} width={64} height={55} alt="" /></span>
            <a href="#premium-contact" className="vg-join-pill btn-lift">Let's Talk <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
