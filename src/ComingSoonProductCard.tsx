import { ArrowIcon } from "./ArrowIcon"
import { useEffect, useState } from "react"
import { useReducedMotion, useReveal } from "./useMotion"

export type UpcomingProduct = {
  name: string
  subtitle: string
  image: string
  width: number
  height: number
}

export function ComingSoonProductCard({ product, index }: { product: UpcomingProduct; index: number }) {
  const { ref, visible } = useReveal(0.08)
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<"teaser" | "shaking" | "revealed">("teaser")
  useEffect(() => {
    if (phase !== "shaking") return
    if (reduced) { setPhase("revealed"); return }
    const timer = window.setTimeout(() => setPhase("revealed"), 400)
    return () => window.clearTimeout(timer)
  }, [phase, reduced])
  const revealed = phase === "revealed"
  return (
    <div ref={ref} className={`launch-card-entry reveal d${index + 1} ${visible ? "visible" : ""}`}>
      <button type="button" className="launch-card" data-phase={phase}
        aria-label={`${revealed ? "Revealed" : "Reveal"} ${product.name}`}
        aria-expanded={revealed} aria-controls={`launch-detail-${index}`}
        onClick={() => { if (phase === "teaser") setPhase(reduced ? "revealed" : "shaking") }}>
        <span className="launch-visual"><span className="launch-image-motion"><img src={product.image} width={product.width} height={product.height} loading="lazy" decoding="async" alt={`Vital Glow ${product.name}`} /></span><span className="launch-image-tag">A first look</span></span>
        <span className="launch-card-info">
          <span className="launch-index">0{index + 1} <span>/</span> Coming Soon</span>
          <span className="launch-product-name">{product.name}</span>
          <span className="launch-subtitle">{product.subtitle}</span>
          <span className="launch-detail-slot"><span id={`launch-detail-${index}`} hidden={!revealed}>New Vital Glow formula. Coming soon.</span></span>
          <span className="launch-action" aria-live="polite">{revealed ? "Revealed" : phase === "shaking" ? "Revealing…" : <><span className="launch-touch-label">Tap to reveal</span><span className="launch-pointer-label">Click to reveal</span></>}<span aria-hidden="true">{revealed ? "✓" : <ArrowIcon />}</span></span>
        </span>
      </button>
    </div>
  )
}
