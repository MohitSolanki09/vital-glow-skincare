import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { useReducedMotion } from "./useMotion"

/** One app-wide scroll controller; StrictMode cleanup destroys its owned RAF. */
export function useSmoothScroll() {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      allowNestedScroll: true,
      prevent: node => node.matches("select, textarea"),
    })

    // Preserve URL/history and native modified-click behavior while preventing
    // the browser's anchor jump from competing with Lenis.
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
      // Lenis reads the existing root scroll-padding-top for the fixed header.
      lenis.scrollTo(target, {
        onComplete: () => {
          const addedTabIndex = !target.hasAttribute("tabindex")
          if (addedTabIndex) target.setAttribute("tabindex", "-1")
          target.focus({ preventScroll: true })
          if (addedTabIndex) target.removeAttribute("tabindex")
        },
      })
    }
    document.addEventListener("click", onAnchorClick)
    return () => {
      document.removeEventListener("click", onAnchorClick)
      lenis.destroy()
    }
  }, [reduced])
}
