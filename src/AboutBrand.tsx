import { useReveal } from "./useMotion"
import brandImage from "./assets/vital-glow-brand-story.png"
import "./about-brand.css"

export function AboutBrand() {
  const { ref, visible } = useReveal(0.08)
  const reveal = `reveal ${visible ? "visible" : ""}`
  return (
    <section id="about" className="brand-story section-space" aria-labelledby="brand-story-title">
      <div ref={ref} className="page-container brand-story-grid">
        <header className="brand-story-heading">
          <p className={`brand-story-eyebrow ${reveal}`}>About The Brand</p>
          <h2 id="brand-story-title" className={`${reveal} d1`}>Simple Care.<br /><em>Better Skin.</em></h2>
        </header>
        <div className={`brand-story-copy ${reveal} d2`}>
          <p>Vital Glow was founded on a simple truth — great skin shouldn't require complicated routines. We create targeted, science-backed formulas designed to work with your skin, not against it.</p>
          <p>Every product we make is free from sulphates and parabens, rooted in proven actives, and built for everyday use. Clear, confident skin — that's the goal, every single day.</p>
        </div>
        <div className={`brand-story-visual ${reveal} d3`}>
          <div className="brand-story-orbit" aria-hidden="true" />
          <span className="brand-story-note">Daily Essential <span aria-hidden="true">✦</span></span>
          <div className="brand-story-photo"><img src={brandImage} width={1145} height={1374} loading="lazy" decoding="async" alt="Vital Glow Acne Fight face wash surrounded by water, leaves and pale stone" /></div>
          <div className={`brand-story-badge ${reveal} d4`}><strong>100%</strong><span>Sulphate &amp;<br />Paraben Free</span></div>
        </div>
        <ol className="brand-story-principles">
          {[
            ["Quality", "Proven actives only"],
            ["Care", "Skin-barrier safe"],
            ["Innovation", "Science-driven R&D"],
          ].map(([title, description], index) => (
            <li key={title} className={`${reveal} d${index + 2}`}><span className="brand-story-number">0{index + 1}</span><h3>{title}</h3><p>{description}</p></li>
          ))}
        </ol>
      </div>
    </section>
  )
}
