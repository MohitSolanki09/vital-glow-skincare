import { useState } from "react"
import { useReveal } from "./useMotion"
import "./premium-contact.css"

const details = [
  { label: "Email", value: "vitalglow111@gmail.com", href: "mailto:vitalglow111@gmail.com" },
  { label: "Phone", value: "+91 93134 94513", href: "tel:+919313494513" },
  { label: "Location", value: "Lalpur Main Road\nNear BOB ATM, Dared\nJamnagar - 361012" },
]

export function PremiumContactSection() {
  const intro = useReveal(0.08)
  const panel = useReveal(0.08)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [validated, setValidated] = useState(false)
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
          <form className={`premium-contact__form reveal ${panel.visible ? "visible" : ""} d1`} onSubmit={event => {
            event.preventDefault()
            if (!form.message.trim()) {
              const field = event.currentTarget.querySelector<HTMLTextAreaElement>("textarea")
              field?.setCustomValidity("Please enter a message.")
              field?.reportValidity()
              return
            }
            setValidated(true)
          }}>
            <div className="premium-contact__fields">
              {([
                { key: "name", label: "Name", type: "text", placeholder: "Your full name" },
                { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                { key: "phone", label: "Phone (optional)", type: "tel", placeholder: "+91 00000 00000" },
              ] as const).map(field => <div key={field.key} className={`premium-contact__field premium-contact__field--${field.key}`}>
                <label htmlFor={`premium-contact-${field.key}`}>{field.label}</label>
                <input id={`premium-contact-${field.key}`} name={field.key} type={field.type} autoComplete={field.key === "phone" ? "tel" : field.key} required={field.key !== "phone"} pattern={field.key === "name" ? ".*\\S.*" : undefined} aria-describedby="premium-contact-note" placeholder={field.placeholder} value={form[field.key]} onChange={event => { setForm({ ...form, [field.key]: event.target.value }); setValidated(false) }} />
              </div>)}
              <div className="premium-contact__field premium-contact__field--message">
                <label htmlFor="premium-contact-message">Message</label>
                <textarea id="premium-contact-message" name="message" rows={3} required aria-describedby="premium-contact-note" placeholder="How can we help?" value={form.message} onChange={event => { event.target.setCustomValidity(""); setForm({ ...form, message: event.target.value }); setValidated(false) }} />
              </div>
            </div>
            <div className="premium-contact__submit-row"><button type="submit" className="premium-contact__submit btn-lift">Send Message <span aria-hidden="true">↗</span></button><p id="premium-contact-note">Local validation only. Messages are not sent.<br />Name, email and message are required.</p></div>
            <p className="premium-contact__status" role="status">{validated ? "Your message was validated locally but was not sent. Please use vitalglow111@gmail.com to contact us." : ""}</p>
          </form>
        </div>
      </div>
    </section>
  )
}
