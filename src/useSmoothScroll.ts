import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { useReducedMotion } from "./useMotion"

export function useSmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      // The existing preference hook owns the instance lifecycle.
      respectReducedMotion: false,
      prevent: node => {
        const nativeScroll = !!node.closest("select, textarea, .mobile-menu-content")
        // Yield any remaining momentum before native scrolling can move the page.
        // Otherwise the next Lenis frame can overwrite that native position.
        if (nativeScroll && lenis.isScrolling === "smooth") {
          lenis.scrollTo(lenis.actualScroll, { immediate: true })
        }
        return nativeScroll
      },
    })

    const onAnchorClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return
      const url = new URL(link.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return
      let id: string
      try { id = decodeURIComponent(url.hash.slice(1)) } catch { return }
      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      if (location.hash !== url.hash) history.pushState(null, "", url.hash)
      // Lenis reads scroll-padding-top; adding an offset here would double it.
      lenis.scrollTo(target, { onComplete: () => target.focus({ preventScroll: true }) })
    }

    let resumeAfterModal = false
    const onContactModal = () => {
      if (document.querySelector(".contact-submission-dialog[open]")) {
        if (!lenis.isStopped) { resumeAfterModal = true; lenis.stop() }
      } else if (resumeAfterModal) {
        resumeAfterModal = false
        lenis.start()
      }
    }
    onContactModal()
    window.addEventListener("vital-glow:contact-modal", onContactModal)
    document.addEventListener("click", onAnchorClick)
    return () => {
      document.removeEventListener("click", onAnchorClick)
      window.removeEventListener("vital-glow:contact-modal", onContactModal)
      lenis.destroy()
    }
  }, [reduced])
}
