import { CTAArrow } from "./CTAArrow"
import { useState } from "react"
import { useReveal } from "./useMotion"
import "./premium-contact.css"

const details = [
  { label: "Email", value: "vitalglow111@gmail.com", href: "mailto:vitalglow111@gmail.com" },
  { label: "Phone", value: "+91 93134 94513", href: "tel:+919313494513" },
  { label: "Location", value: "Lalpur Main Road, Near BOB ATM, Dared\nJamnagar - 361012" },
]

const enquiryProducts = ["Acne Fight Face Wash", "Shampoo — Coming Soon", "Onion Hair Oil — Coming Soon", "Hair Oil — Coming Soon", "General Product Enquiry"]

export function PremiumContactSection() {
  const intro = useReveal(0.08)
  const panel = useReveal(0.08)
  const [form, setForm] = useState({ name: "", email: "", phone: "", product: "", message: "" })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState<{ field: string; message: string } | null>(null)
  const reveal = `reveal ${intro.visible ? "visible" : ""}`
  return (
    <section id="premium-contact" className="premium-contact section-space" aria-labelledby="premium-contact-title">
      <div className="page-container">
        <div ref={intro.ref} className="premium-contact__intro">
          <div>
            <p className={`premium-contact__eyebrow ${reveal}`}>Contact Us</p>
            <h2 id="premium-contact-title" className={`${reveal} d1`}>Let's create a<br /><em>conversation.</em></h2>
            <p className={`premium-contact__description ${reveal} d2`}>Product questions, wholesale enquiries, or just want to say hello — we'd genuinely love to hear from you.</p>
          </div>
          <div className="premium-contact__details">
            <p className={`premium-contact__label ${reveal}`}>Get in touch</p>
            <dl>{details.map((detail, index) => <div key={detail.label} className={`${reveal} d${index + 1}`}><dt>{detail.label}</dt><dd>{detail.href ? <a href={detail.href}>{detail.value}<span aria-hidden="true">↗</span></a> : <span style={{ whiteSpace: "pre-line" }}>{detail.value}</span>}</dd></div>)}</dl>
          </div>
        </div>
        <div ref={panel.ref} className={`premium-contact__panel reveal ${panel.visible ? "visible" : ""}`}>
          <div className="premium-contact__invitation">
            <p className="premium-contact__label">Have a question?</p>
            <h3>We'd love to<br /><em>hear from you.</em></h3>
            <p>Tell us what's on your mind.<br />Start with a simple hello.</p>
            <div className="premium-contact__contour" aria-hidden="true"><span>✦</span></div>
          </div>
          <form noValidate className={`premium-contact__form reveal ${panel.visible ? "visible" : ""} d1`} onSubmit={event => {
            event.preventDefault()
            setValidated(false)
            setError(null)
            const fields = event.currentTarget.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea")
            for (const field of fields) {
              if (!field.value.trim() || !field.validity.valid) {
                const message = field.name === "product"
                  ? "Please select a product."
                  : field.name === "email" && field.value.trim()
                  ? "Please enter a valid email address."
                  : "Please enter your " + (field.name === "phone" ? "phone number" : field.name) + "."
                setError({ field: field.name, message })
                field.focus()
                return
              }
            }
            setValidated(true)
          }}>
            <div className="premium-contact__fields">
              {([
                { key: "name", label: "Name", type: "text", placeholder: "Your full name" },
                { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                { key: "phone", label: "Phone", type: "tel", placeholder: "+91 00000 00000" },
              ] as const).map(field => <div key={field.key} className={`premium-contact__field premium-contact__field--${field.key}`}>
                <label htmlFor={`premium-contact-${field.key}`}>{field.label}</label>
                <input id={`premium-contact-${field.key}`} name={field.key} type={field.type} autoComplete={field.key === "phone" ? "tel" : field.key} required pattern={field.key !== "email" ? ".*\\S.*" : undefined} aria-invalid={error?.field === field.key || undefined} aria-describedby={error?.field === field.key ? "premium-contact-status" : undefined} placeholder={field.placeholder} value={form[field.key]} onChange={event => { setForm({ ...form, [field.key]: event.target.value }); setValidated(false); setError(null) }} />
              </div>)}
              <div className="premium-contact__field premium-contact__field--product">
                <label htmlFor="premium-contact-product">Product Enquiry</label>
                <div className="premium-contact__select-wrap">
                  <select id="premium-contact-product" name="product" required value={form.product} aria-invalid={error?.field === "product" || undefined} aria-describedby={error?.field === "product" ? "premium-contact-status" : undefined} onChange={event => { setForm({ ...form, product: event.target.value }); setValidated(false); setError(null) }}>
                    <option value="" disabled>Select a product</option>
                    {enquiryProducts.map(product => <option key={product} value={product}>{product}</option>)}
                  </select>
                  <span className="premium-contact__select-value" data-placeholder={!form.product} aria-hidden="true">{form.product || "Select a product"}</span>
                  <svg className="premium-contact__select-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <div className="premium-contact__field premium-contact__field--message">
                <label htmlFor="premium-contact-message">Message</label>
                <textarea id="premium-contact-message" name="message" rows={3} required aria-invalid={error?.field === "message" || undefined} aria-describedby={error?.field === "message" ? "premium-contact-status" : undefined} placeholder="How can we help?" value={form.message} onChange={event => { setForm({ ...form, message: event.target.value }); setValidated(false); setError(null) }} />
              </div>
            </div>
            <div className="premium-contact__submit-row"><button type="submit" className="premium-contact__submit vg-cta">Send Message <CTAArrow /></button></div>
            <p id="premium-contact-status" className="premium-contact__status" role={error ? "alert" : "status"}>{error ? error.message : validated ? "Your message was validated locally but was not sent. Please use vitalglow111@gmail.com to contact us." : ""}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
