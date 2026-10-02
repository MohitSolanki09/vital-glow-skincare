import { useEffect, useRef, useState } from "react"

/** Follow preference changes without requiring a reload. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(query.matches)
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return reduced
}

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (reduced || !("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [reduced, threshold])
  return { ref, visible }
}

/** Measure a stationary parent; transforms must not feed back into geometry. */
export function useProductParallax(kind: "hero" | "detail") {
  const frameRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    const frame = frameRef.current
    const image = imageRef.current
    if (!frame || !image) return
    const desktop = window.matchMedia("(min-width: 640px)")
    let scheduled = 0
    const update = () => {
      scheduled = 0
      if (reduced || !desktop.matches) {
        image.style.removeProperty("transform")
        return
      }
      const rect = frame.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      if (kind === "hero") {
        image.style.transform = `translateY(${-Math.min(window.scrollY * 0.08, 80)}px)`
      } else {
        const progress = Math.max(
          -1,
          Math.min(
            1,
            (window.innerHeight / 2 - rect.top - rect.height / 2) /
              window.innerHeight,
          ),
        )
        image.style.transform = `rotate(${progress * 5}deg) translateY(${progress * -18}px)`
      }
    }
    const schedule = () => {
      if (!scheduled) scheduled = requestAnimationFrame(update)
    }
    update()
    if (!reduced) {
      window.addEventListener("scroll", schedule, { passive: true })
      window.addEventListener("resize", schedule)
      desktop.addEventListener("change", schedule)
    }
    return () => {
      cancelAnimationFrame(scheduled)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      desktop.removeEventListener("change", schedule)
      image.style.removeProperty("transform")
    }
  }, [kind, reduced])
  return { frameRef, imageRef }
}
