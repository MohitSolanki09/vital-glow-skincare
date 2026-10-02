import { useState, useEffect, useRef } from "react"
import { useReveal, useProductParallax } from "./useMotion"
import productImg from "./assets/product.png"
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
    { label: "Brand", href: "#brand" },
    { label: "Coming Soon", href: "#coming-soon" },
    { label: "Contact", href: "#contact" },
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
        <img
          src={logoImg}
          width={480}
          height={412}
          decoding="async"
          alt="Vital Glow"
          className="h-11 w-auto"
        />

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
            className="px-5 py-2.5 bg-[#0b6b7a] text-white text-sm font-semibold rounded-full btn-lift"
          >
            Shop Now
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
            className="mt-1 px-5 py-3 bg-[#0b6b7a] text-white text-sm font-semibold rounded-full text-center"
            onClick={() => setOpen(false)}
          >
            Shop Now
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
              className="px-7 py-3.5 bg-[#0b6b7a] text-white font-semibold rounded-full btn-lift"
            >
              Shop Now
            </a>
            <a
              href="#product"
              className="px-7 py-3.5 border border-[#0b6b7a]/30 text-[#0b6b7a] font-semibold rounded-full hover:bg-[#0b6b7a]/6 transition-colors duration-300"
            >
              Explore Product
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
              width={1086}
              height={1448}
              decoding="async"
              src={productImg}
              fetchPriority="high"
              alt="Vital Glow Acne Fight Face Wash"
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
function AboutSection() {
  const { ref, visible } = useReveal()
  return (
    <section id="about" className="section-space bg-white">
      <div className="page-container">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-28 items-center reveal ${
            visible ? "visible" : ""
          }`}
        >
          {/* Text */}
          <div className="space-y-8 order-2 lg:order-1">
            <p className="text-xs font-bold tracking-widest uppercase text-[#0b6b7a]">
              About The Brand
            </p>
            <h2
              className="leading-tight text-[#0e1c20]"
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "var(--heading-size)",
              }}
            >
              Simple Care.
              <br />
              Better Skin.
            </h2>
            <p className="text-[#3a5a62] leading-relaxed">
              Vital Glow was founded on a simple truth — great skin shouldn't
              require complicated routines. We create targeted, science-backed
              formulas designed to work with your skin, not against it.
            </p>
            <p className="text-[#3a5a62] leading-relaxed">
              Every product we make is free from sulphates and parabens, rooted
              in proven actives, and built for everyday use. Clear, confident
              skin — that's the goal, every single day.
            </p>

            {/* Values */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-[#0b6b7a]/8">
              {[
                { icon: "◈", title: "Quality", desc: "Proven actives only" },
                { icon: "◉", title: "Care", desc: "Skin-barrier safe" },
                { icon: "✦", title: "Innovation", desc: "Science-driven R&D" },
              ].map((v) => (
                <div key={v.title} className="space-y-2">
                  <span className="text-2xl text-[#0b6b7a]">{v.icon}</span>
                  <p className="font-bold text-[#0e1c20] text-sm">{v.title}</p>
                  <p className="text-xs text-[#526d75] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-[#edf5f7]">
              <img
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&h=875&fit=crop&auto=format"
                loading="lazy"
                decoding="async"
                width={700}
                height={875}
                alt="Skincare routine"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Stat badge */}
            <div className="absolute left-4 bottom-6 lg:-left-6 lg:bottom-14 glass-card rounded-2xl shadow-xl p-5">
              <p
                className="text-3xl font-bold text-[#0b6b7a]"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                100%
              </p>
              <p className="text-xs text-[#526d75] mt-1 leading-snug">
                Sulphate &<br />
                Paraben Free
              </p>
            </div>
            {/* Teal accent slab */}
            <div className="absolute right-0 lg:-right-4 top-12 w-1 h-24 rounded-full bg-[#0b6b7a]/20" />
          </div>
        </div>
      </div>
    </section>
  )
}

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
                  width={1086}
                  height={1448}
                  decoding="async"
                  src={productImg}
                  loading="lazy"
                  alt="Vital Glow Acne Fight Face Wash 100ml"
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
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#0b6b7a] text-white font-semibold rounded-full btn-lift"
            >
              Enquire About This Product
              <span className="text-lg leading-none">→</span>
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

// ─── Brand Identity ──────────────────────────────────────────────────────────
function BrandingSection() {
  const { ref, visible } = useReveal()
  const brandColors = [
    { name: "Vital Gold", hex: "#C8860A", bg: "#C8860A" },
    { name: "Clear Teal", hex: "#0B6B7A", bg: "#0B6B7A" },
    { name: "Pure White", hex: "#FFFFFF", bg: "#FFFFFF", border: true },
    { name: "Deep Night", hex: "#0E1C20", bg: "#0E1C20" },
  ]

  const images = [
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=480&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=480&h=300&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=480&h=300&fit=crop&auto=format",
  ]

  return (
    <section id="brand" className="section-space bg-[#0e1c20] overflow-hidden">
      <div className="page-container">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-20 reveal ${visible ? "visible" : ""}`}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-[#69c5cf] mb-5">
            Brand Identity
          </p>
          <h2
            className="leading-tight text-white"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "var(--heading-size)",
            }}
          >
            Made to Feel Fresh.
            <br />
            <span className="text-gold-gradient">Designed to Stand Out.</span>
          </h2>
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Logo showcase */}
          <div className={`space-y-8 reveal ${visible ? "visible" : ""} d1`}>
            <div className="flex items-center justify-center py-16 px-12 rounded-3xl border border-white/6 bg-white/4 backdrop-blur-sm">
              <img
                src={logoImg}
                width={480}
                height={412}
                decoding="async"
                alt="Vital Glow logo"
                className="w-60 h-auto"
              />
            </div>
            <div>
              <p
                className="text-white/90 text-xl leading-relaxed mb-4"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontStyle: "italic",
                }}
              >
                "Cleanse. Care. Confidence."
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                The golden Vital Glow mark distils everything we stand for —
                luminous health, natural vitality, and the warmth of a brand
                that genuinely cares about your skin.
              </p>
            </div>
          </div>

          {/* Brand details */}
          <div className={`space-y-10 reveal ${visible ? "visible" : ""} d2`}>
            {/* Colors */}
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-5">
                Brand Colors
              </p>
              <div className="space-y-3">
                {brandColors.map((c) => (
                  <div key={c.name} className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex-shrink-0 ${
                        c.border ? "border border-white/15" : ""
                      }`}
                      style={{ backgroundColor: c.bg }}
                    />
                    <div>
                      <p className="text-white/80 font-medium text-sm">
                        {c.name}
                      </p>
                      <p className="text-white/70 text-xs font-mono">{c.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="pt-8 border-t border-white/6">
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-5">
                Typography
              </p>
              <div className="space-y-2">
                <p
                  className="text-5xl text-white leading-none"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Vital Glow
                </p>
                <p className="text-sm text-white/70 mt-2">
                  DM Serif Display — Display & Headings
                </p>
                <p className="text-sm text-white/70 mt-1">
                  DM Sans — Body, UI & Labels
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image strip */}
        <div
          className={`grid sm:grid-cols-3 gap-4 rounded-3xl overflow-hidden reveal ${
            visible ? "visible" : ""
          } d3`}
        >
          {images.map((src, i) => (
            <div key={i} className="aspect-video bg-[#1a2e35] overflow-hidden">
              <img
                src={src}
                loading="lazy"
                decoding="async"
                width={480}
                height={300}
                alt={
                  [
                    "Skincare bottles arranged with botanical ingredients",
                    "Blue skincare bottle on pastel display blocks",
                    "White skincare tube in soft natural light",
                  ][i]
                }
                className="w-full h-full object-cover opacity-60 hover:opacity-90 hover:scale-105 transition-all duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Coming Soon ─────────────────────────────────────────────────────────────
function ComingSoonSection() {
  const { ref, visible } = useReveal()
  const [email, setEmail] = useState("")
  const [joined, setJoined] = useState(false)

  const upcoming = [
    { label: "Clarifying Toner", sub: "Balancing & Pore-Refining" },
    { label: "Gel Moisturiser", sub: "Lightweight Daily Hydration" },
    { label: "Spot Serum", sub: "Targeted Blemish Treatment" },
  ]

  return (
    <section
      id="coming-soon"
      className="section-space relative overflow-hidden bg-[#071015]"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(11,107,122,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(200,134,10,0.18) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative page-container">
        {/* Heading */}
        <div
          ref={ref}
          className={`text-center mb-16 reveal ${visible ? "visible" : ""}`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0b6b7a]/18 border border-[#0b6b7a]/30 rounded-full text-xs font-bold tracking-widest uppercase text-[#5bc0cc] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5bc0cc] animate-pulse" />
            Coming Soon
          </span>
          <h2
            className="text-white leading-tight mb-6"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "var(--heading-size)",
            }}
          >
            More Care.
            <br />
            More Innovation.
          </h2>
          <p className="text-white/70 max-w-lg mx-auto leading-relaxed">
            We're expanding the Vital Glow range. New solutions, same commitment
            to gentle, effective skincare that works.
          </p>
        </div>

        {/* Product placeholder cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {upcoming.map((p, i) => (
            <div
              key={p.label}
              className={`rounded-3xl border border-white/5 p-10 flex flex-col items-center gap-6 text-center reveal ${
                visible ? "visible" : ""
              } d${i + 1}`}
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Abstract silhouette */}
              <div className="relative w-20 h-28 rounded-2xl overflow-hidden border border-white/8 bg-gradient-to-b from-white/6 to-white/2 flex items-end justify-center pb-3">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-5 h-3 rounded-t-full bg-white/10" />
                <div className="w-10 h-1.5 rounded-full bg-white/12" />
                <div
                  className="absolute inset-x-0 bottom-0 h-2/3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,107,122,0.12), transparent)",
                  }}
                />
              </div>
              <div>
                <p className="font-bold text-white/75 text-base">{p.label}</p>
                <p className="text-white/70 text-sm mt-1">{p.sub}</p>
                <span className="inline-block mt-4 text-[10px] font-bold tracking-widest uppercase text-[#69c5cf] px-3 py-1 rounded-full border border-[#0b6b7a]/25 bg-[#0b6b7a]/10">
                  Coming Soon
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className="text-center">
          <p className="text-white/70 text-sm mb-5">
            Be the first to know when new products launch.
          </p>
          <p id="updates-note" className="text-white/70 text-sm mb-5">
            Launch updates are not connected yet. This form only validates your
            email.
          </p>
          {joined ? (
            <p role="status" className="text-[#5bc0cc] font-medium">
              Email validated locally. It has not been sent; launch updates are
              not connected yet.
            </p>
          ) : (
            <form
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setJoined(true)
              }}
            >
              <label htmlFor="updates-email" className="sr-only">
                Email address for launch updates
              </label>
              <input
                id="updates-email"
                name="email"
                autoComplete="email"
                aria-describedby="updates-note"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/22 text-sm focus:outline-none focus:border-[#0b6b7a]/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#0b6b7a] text-white font-semibold rounded-full hover:bg-[#0b8fa0] transition-colors duration-300 text-sm whitespace-nowrap"
              >
                Stay Updated
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, visible } = useReveal()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.message.trim()) {
      const field =
        e.currentTarget.querySelector<HTMLTextAreaElement>("textarea")
      field?.setCustomValidity("Please enter a message.")
      field?.reportValidity()
      return
    }
    setSent(true)
  }

  const info = [
    { icon: "✉", label: "Email", value: "hello@vitalglow.com" },
    { icon: "☎", label: "Phone", value: "+91 98765 43210" },
    { icon: "◉", label: "Website", value: "www.vitalglow.com" },
    { icon: "▲", label: "Location", value: "Mumbai, India" },
  ]

  const socials = ["IG", "FB", "TW", "YT"]

  return (
    <section id="contact" className="section-space bg-white">
      <div className="page-container">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-28 reveal ${
            visible ? "visible" : ""
          }`}
        >
          {/* Info */}
          <div className="space-y-10">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#0b6b7a] mb-4">
                Contact Us
              </p>
              <h2
                className="text-[#0e1c20] leading-tight mb-4"
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "var(--heading-size)",
                }}
              >
                Let's Connect.
              </h2>
              <p className="text-[#3a5a62] leading-relaxed">
                Product questions, wholesale enquiries, or just want to say
                hello — we'd genuinely love to hear from you.
              </p>
            </div>

            <div className="space-y-5">
              {info.map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#edf5f7] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0b6b7a] text-sm">{c.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-[#526d75] mb-0.5">
                      {c.label}
                    </p>
                    {c.label === "Email" ? (
                      <a
                        className="text-[#0b6b7a] text-sm underline underline-offset-4"
                        href={`mailto:${c.value}`}
                      >
                        {c.value}
                      </a>
                    ) : c.label === "Phone" ? (
                      <a
                        className="text-[#0b6b7a] text-sm underline underline-offset-4"
                        href={`tel:${c.value.replace(/\s/g, "")}`}
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-[#0e1c20] font-medium text-sm">
                        {c.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-[#526d75] mb-4">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <button
                    type="button"
                    disabled
                    title="Social profile not connected"
                    aria-label={`${s} — profile not connected`}
                    key={s}
                    className="w-10 h-10 rounded-full border border-[#0b6b7a]/20 text-[#0b6b7a] text-xs font-bold hover:bg-[#0b6b7a] hover:text-white hover:border-transparent transition-all duration-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div
                role="status"
                className="h-full flex flex-col items-center justify-center text-center gap-5 py-16"
              >
                <div className="w-16 h-16 rounded-full bg-[#edf5f7] flex items-center justify-center text-2xl text-[#0b6b7a]">
                  ✦
                </div>
                <h3
                  className="text-3xl text-[#0e1c20]"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Message validated
                </h3>
                <p className="text-[#526d75] text-sm">
                  Your message was validated locally but was not sent. Please
                  use the email address shown to contact us.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <p id="contact-note" className="text-sm text-[#526d75]">
                  This form validates locally; messages are not sent yet. Name,
                  email and message are required.
                </p>
                {[
                  {
                    key: "name",
                    label: "Name",
                    type: "text",
                    placeholder: "Your full name",
                  },
                  {
                    key: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "your@email.com",
                  },
                  {
                    key: "phone",
                    label: "Phone",
                    type: "tel",
                    placeholder: "+91 00000 00000",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label
                      htmlFor={`contact-${f.key}`}
                      className="block text-[10px] font-bold tracking-widest uppercase text-[#526d75] mb-2"
                    >
                      {f.label}
                    </label>
                    <input
                      id={`contact-${f.key}`}
                      name={f.key}
                      autoComplete={f.key === "phone" ? "tel" : f.key}
                      required={f.key !== "phone"}
                      aria-describedby="contact-note"
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[(f.key as keyof typeof form)]}
                      pattern={f.key === "name" ? ".*\\S.*" : undefined}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-2xl border border-[#0b6b7a]/14 bg-[#f7fafb] text-[#0e1c20] text-sm placeholder-[#b0c8ce] focus:outline-none focus:border-[#0b6b7a]/40 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[10px] font-bold tracking-widest uppercase text-[#526d75] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    aria-describedby="contact-note"
                    rows={5}
                    placeholder="How can we help?"
                    value={form.message}
                    onChange={(e) => {
                      e.target.setCustomValidity("")
                      setForm({ ...form, message: e.target.value })
                    }}
                    className="w-full px-5 py-3.5 rounded-2xl border border-[#0b6b7a]/14 bg-[#f7fafb] text-[#0e1c20] text-sm placeholder-[#b0c8ce] focus:outline-none focus:border-[#0b6b7a]/40 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#0b6b7a] text-white font-semibold rounded-2xl btn-lift"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const footerLinks = ["Product", "About", "Brand", "Coming Soon", "Contact"]
  const socials = ["IG", "FB", "TW", "YT"]

  return (
    <footer className="bg-[#0e1c20] pt-20 pb-10">
      <div className="page-container">
        <div className="grid md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src={logoImg}
              width={480}
              height={412}
              decoding="async"
              alt="Vital Glow"
              className="h-14 w-auto"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Strong on Acne. Gentle on You.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-5">
              Quick Links
            </p>
            <div className="space-y-2.5">
              {footerLinks.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(" ", "-")}`}
                  className="block text-white/70 text-sm hover:text-white transition-colors duration-300"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Social + legal */}
          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/70 mb-5">
                Follow Us
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <button
                    type="button"
                    disabled
                    title="Social profile not connected"
                    aria-label={`${s} — profile not connected`}
                    key={s}
                    className="w-9 h-9 rounded-full border border-white/10 text-white/70 text-xs font-bold hover:bg-[#0b6b7a] hover:text-white hover:border-transparent transition-all duration-300"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {["Privacy Policy", "Terms & Conditions"].map((l) => (
                <a
                  key={l}
                  aria-disabled="true"
                  title="Policy not published yet"
                  className="block text-white/70 text-xs hover:text-white/60 transition-colors duration-300"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/70 text-xs">
            © 2024 Vital Glow. All rights reserved.
          </p>
          <p className="text-white/70 text-xs">
            Crafted with care. Made in India.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <ProductDetailSection />
        <BenefitsSection />
        <ProductOrbitSection />
        <SkincareEditorialSection />
        <BrandingSection />
        <ComingSoonSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
