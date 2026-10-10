import { CTAArrow } from "./CTAArrow"
import { useSmoothScroll } from "./useSmoothScroll"
import { Footer } from "./Footer"
import { ComingSoonSection } from "./ComingSoon"
import { PremiumContactSection } from "./PremiumContactSection"
import { AboutBrand } from "./AboutBrand"
import { useState, useEffect, useRef } from "react"
import { useReveal, useProductParallax } from "./useMotion"
import productImg from "./assets/vital-glow-acne-fight-lifestyle.png"
import logoImg from "./assets/logo-480.png"
import { ProductOrbitSection, SkincareEditorialSection } from "./EditorialSections"

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia("(min-width: 1024px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false)
    }
    document.addEventListener("keydown", closeOnEscape)
    desktop.addEventListener("change", closeOnDesktop)
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      desktop.removeEventListener("change", closeOnDesktop)
    }
  }, [open])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Product", href: "#product" },
    { label: "Coming Soon", href: "#coming-soon" },
    { label: "Contact", href: "#premium-contact" },
  ]

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-white/92 backdrop-blur-md shadow-[0_1px_24px_rgba(11,107,122,0.07)]"
          : "bg-transparent"
      }`}
    >
      <div className="page-container py-4 flex items-center justify-between">
        <a href="#home" aria-label="Vital Glow — Go to Home" onClick={() => setOpen(false)}>
        <img
          src={logoImg}
          width={480}
          height={412}
          decoding="async"
          alt="Vital Glow"
          className="h-11 w-auto"
        />
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-[#0e1c20]/60 hover:text-[#0b6b7a] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#product"
            className="vg-cta"
          >
            Shop Now <CTAArrow />
          </a>
        </div>

        {/* Hamburger */}
        <button
          ref={menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="lg:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-6 h-[2px] bg-[#0e1c20] transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[#0e1c20] transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-[#0e1c20] transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        data-open={open}
        className="lg:hidden mobile-menu bg-white/96 backdrop-blur-md"
      >
        <div className="mobile-menu-content">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-base font-medium text-[#0e1c20]/70 hover:text-[#0b6b7a] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#product"
            className="mt-1 vg-cta"
            onClick={() => setOpen(false)}
          >
            Shop Now <CTAArrow />
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const { frameRef, imageRef } = useProductParallax("hero")
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #eef8fa 0%, #f7fafb 45%, #ebf4f6 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(11,107,122,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(200,134,10,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Decorative rings */}
        <div className="absolute top-[15%] right-[8%] w-[480px] h-[480px] rounded-full border border-[#0b6b7a]/8" />
        <div className="absolute top-[20%] right-[12%] w-[350px] h-[350px] rounded-full border border-[#c8860a]/6" />
        {/* Scattered dots */}
        <div className="absolute top-40 left-[18%] w-2 h-2 rounded-full bg-[#0b6b7a]/20" />
        <div className="absolute top-60 left-[38%] w-1.5 h-1.5 rounded-full bg-[#c8860a]/25" />
        <div className="absolute bottom-40 right-[30%] w-2 h-2 rounded-full bg-[#0b6b7a]/15" />
      </div>

      <div className="relative page-container pt-28 pb-24 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-8 animate-fadein">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0b6b7a]/8 border border-[#0b6b7a]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0b6b7a] animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[#0b6b7a] uppercase">
              New Formula · 100ml
            </span>
          </div>

          <h1
            className="leading-[1.04]"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "var(--hero-size)",
              color: "#0e1c20",
            }}
          >
            Clear Skin <br />
            <span style={{ color: "#0b6b7a" }}>Starts Here.</span>
          </h1>

          <p className="text-[#3a5a62] text-lg leading-relaxed max-w-md">
            A daily face wash engineered for acne-prone skin. Gentle enough for
            every morning, effective enough to see a real difference.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-1">
            <a
              href="#product"
              className="vg-cta"
            >
              Shop Now <CTAArrow />
            </a>
            <a
              href="#product"
              className="vg-cta vg-cta--secondary"
            >
              Explore Product <CTAArrow />
            </a>
          </div>

          {/* Benefit pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            {["Gentle Cleansing", "Fresh & Clean Skin", "Daily Skincare"].map(
              (b) => (
                <span
                  key={b}
                  className="glass-card px-4 py-2 rounded-full text-sm text-[#0b6b7a] font-medium shadow-sm"
                >
                  {b}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Right: product + floating labels */}
        <div
          ref={frameRef}
          className="hero-product relative flex items-center justify-center min-h-[480px]"
        >
          {/* Glow behind product */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(11,107,122,0.10) 0%, transparent 70%)",
            }}
          />

          {/* Floating label: Salicylic Acid */}
          <div
            className="absolute left-0 top-16 animate-float z-20"
            style={{ animationDelay: "0s" }}
          >
            <div className="glass-card rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2.5">
              <span className="text-[#0b6b7a] text-base">◈</span>
              <div>
                <p className="text-xs font-bold text-[#0e1c20] leading-none">
                  Salicylic Acid
                </p>
                <p className="text-[10px] text-[#526d75] mt-0.5">1% Active</p>
              </div>
            </div>
          </div>

          {/* Floating label: Sulphate Free */}
          <div
            className="absolute right-0 top-28 animate-floatB z-20"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="glass-card rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2.5">
              <span className="text-[#c8860a] text-base">✦</span>
              <div>
                <p className="text-xs font-bold text-[#0e1c20] leading-none">
                  Sulphate Free
                </p>
                <p className="text-[10px] text-[#526d75] mt-0.5">
                  Gentle Formula
                </p>
              </div>
            </div>
          </div>

          {/* Floating label: 100ml */}
          <div
            className="absolute right-2 bottom-28 animate-floatC z-20"
            style={{ animationDelay: "1.6s" }}
          >
            <div className="glass-card rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2.5">
              <span className="text-[#0b6b7a] text-base">◉</span>
              <div>
                <p className="text-xs font-bold text-[#0e1c20] leading-none">
                  Full Size
                </p>
                <p className="text-[10px] text-[#526d75] mt-0.5">100 ml</p>
              </div>
            </div>
          </div>

          {/* Original product image */}
          <div
            ref={imageRef}
            className="relative z-10 w-full max-w-72 sm:max-w-80 lg:max-w-[22rem]"
          >
            <img
              width={1024}
              height={1536}
              decoding="async"
              src={productImg}
              fetchPriority="high"
              alt="Vital Glow Acne Fight Face Wash"
              style={{ aspectRatio: "3 / 4", objectFit: "cover", objectPosition: "50% 50%" }}
              className="w-full rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll">
        <span className="text-[10px] font-bold tracking-widest text-[#526d75] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#0b6b7a]/40 to-transparent" />
      </div>
    </section>
  )
}

// ─── About ──────────────────────────────────────────────────────────────────
// ─── Product Detail ──────────────────────────────────────────────────────────
function ProductDetailSection() {
  const { frameRef, imageRef } = useProductParallax("detail")
  const { ref, visible } = useReveal()
  const specs = [
    {
      icon: "◈",
      label: "Key Actives",
      value: "1% Salicylic Acid · 1% Licorice Extract · 2% Niacinamide",
    },
    { icon: "◉", label: "Skin Type", value: "Acne-Prone · Oily · Combination" },
    {
      icon: "✦",
      label: "Texture",
      value: "Light gel-to-foam — rinses clean, no residue",
    },
    {
      icon: "▷",
      label: "Usage",
      value: "Twice daily — morning & evening on damp skin",
    },
    { icon: "▣", label: "Size", value: "100 ml pump bottle" },
    { icon: "◻", label: "Formula", value: "Sulphate Free · Paraben Free" },
  ]

  return (
    <section id="product" className="section-space bg-[#f0f8fa]">
      <div className="page-container">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center reveal ${
            visible ? "visible" : ""
          }`}
        >
          {/* Product image */}
          <div className="flex justify-center">
            <div
              ref={frameRef}
              className="relative w-full max-w-72 sm:max-w-80 lg:max-w-[22rem]"
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 65% at 50% 55%, rgba(11,107,122,0.14) 0%, transparent 70%)",
                }}
              />
              <div
                ref={imageRef}
                className="relative w-full max-w-72 sm:max-w-80 lg:max-w-[22rem]"
              >
                <img
                  width={1024}
                  height={1536}
                  decoding="async"
                  src={productImg}
                  loading="lazy"
                  alt="Vital Glow Acne Fight Face Wash 100ml"
                  style={{ aspectRatio: "3 / 4", objectFit: "cover", objectPosition: "50% 50%" }}
                  className="w-full rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#0b6b7a] mb-3">
                Our Product
              </p>
              <h2
                className="leading-tight text-[#0e1c20] mb-4"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "var(--heading-size)",
                }}
              >
                Acne Fight
                <br />
                Face Wash
              </h2>
              <p className="text-[#3a5a62] leading-relaxed">
                Strong on acne. Gentle on you. A targeted daily cleanser that
                fights breakouts at the source without stripping or over-drying
                your skin.
              </p>
            </div>

            <div className="space-y-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#0b6b7a]/8 hover:border-[#0b6b7a]/22 hover:shadow-sm transition-all duration-300"
                >
                  <span className="text-[#0b6b7a] text-base mt-0.5 w-4 flex-shrink-0">
                    {s.icon}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#526d75]">
                      {s.label}
                    </p>
                    <p className="text-[#0e1c20] font-medium text-sm mt-0.5">
                      {s.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#premium-contact"
              className="vg-cta"
            >
              Enquire About This Product
              <CTAArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Benefits ───────────────────────────────────────────────────────────────
function BenefitsSection() {
  const { ref, visible } = useReveal(0.08)
  const cards = [
    {
      icon: "◉",
      title: "Deep & Gentle Cleansing",
      desc: "Removes excess sebum, daily impurities, and pore-clogging debris without disrupting the moisture barrier.",
    },
    {
      icon: "✦",
      title: "Refreshing Feel",
      desc: "Light gel-to-foam texture rinses completely clean — skin feels fresh and breathable, not tight.",
    },
    {
      icon: "◈",
      title: "Daily Skin Care",
      desc: "Gentle enough for morning and evening use, making it the easiest anchor to any routine.",
    },
    {
      icon: "▷",
      title: "Skin-Friendly Formula",
      desc: "Zero sulphates, zero parabens. Built for sensitive, acne-prone skin that needs consistency.",
    },
  ]

  return (
    <section id="benefits" className="section-space bg-white">
      <div className="page-container">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0b6b7a] mb-4">
            Why This Product
          </p>
          <h2
            className="text-[#0e1c20]"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "var(--heading-size)",
            }}
          >
            Built for real skin.
          </h2>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`benefit-card p-8 rounded-3xl border border-[#0b6b7a]/8 bg-[#f7fafb] hover:bg-[#edf5f7] hover:border-[#0b6b7a]/20 transition-all duration-300 group reveal ${
                visible ? "visible" : ""
              } d${i + 1}`}
            >
              <span className="text-3xl text-[#0b6b7a] group-hover:text-[#c8860a] transition-colors duration-300 block mb-6">
                {c.icon}
              </span>
              <h3 className="font-bold text-[#0e1c20] mb-3 leading-snug text-[0.95rem]">
                {c.title}
              </h3>
              <p className="text-sm text-[#526d75] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  useSmoothScroll()
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutBrand />
        <ProductDetailSection />
        <BenefitsSection />
        <ProductOrbitSection />
        <SkincareEditorialSection />
        <ComingSoonSection />

        <PremiumContactSection />
      </main>
      <Footer />
    </div>
  )
}

