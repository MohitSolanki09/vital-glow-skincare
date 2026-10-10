export const enquiryProducts = ["Acne Fight Face Wash", "Shampoo — Coming Soon", "Onion Hair Oil — Coming Soon", "Hair Oil — Coming Soon", "General Product Enquiry"]

// Public form identifier, not an SMTP credential. The receiving inbox is configured in Web3Forms.
export const WEB3FORMS_ACCESS_KEY = "c10eea96-20e1-43a9-8e59-832d5a2c67e9"
export type ContactFields = { name: string; email: string; phone: string; product: string; message: string }
export type ContactError = { field: keyof ContactFields; message: string }
export type SubmissionResult = "success" | "error" | "uncertain" | "cancelled"
export type SubmitEnquiry = (fields: ContactFields, botcheck: boolean, signal: AbortSignal) => Promise<SubmissionResult>

export function validateContact(fields: ContactFields): ContactError | null {
  if (!fields.name.trim()) return { field: "name", message: "Please enter your name." }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) return { field: "email", message: "Please enter a valid email address." }
  const phone = fields.phone.trim()
  const digits = phone.replace(/\D/g, "")
  if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15 || /^(\d)\1+$/.test(digits)) {
    return { field: "phone", message: "Please enter a valid phone number (7–15 digits)." }
  }
  if (!enquiryProducts.includes(fields.product)) return { field: "product", message: "Please select a product." }
  if (!fields.message.trim()) return { field: "message", message: "Please enter your message." }
  return null
}

export function enquiryPayload(fields: ContactFields, accessKey: string, botcheck: boolean) {
  return {
    access_key: accessKey,
    subject: "New Product Enquiry | Vital Glow",
    from_name: "Vital Glow Website",
    name: fields.name.trim(),
    email: fields.email.trim(), // Web3Forms uses email as reply-to by default.
    phone: fields.phone.trim(),
    product_enquiry: fields.product,
    message: fields.message.trim(),
    source: "Vital Glow Website",
    website: "https://vitalglow111.com",
    botcheck,
  }
}

export async function submitEnquiry(
  fields: ContactFields,
  botcheck: boolean,
  signal: AbortSignal,
  options: { fetcher?: typeof fetch; accessKey?: string; timeoutMs?: number } = {},
): Promise<SubmissionResult> {
  const accessKey = options.accessKey ?? WEB3FORMS_ACCESS_KEY
  if (signal.aborted) return "cancelled"
  if (!accessKey.trim() || botcheck || validateContact(fields)) return "error"
  const controller = new AbortController()
  const abort = () => controller.abort()
  signal.addEventListener("abort", abort, { once: true })
  const timer = setTimeout(abort, options.timeoutMs ?? 25000)
  try {
    const response = await (options.fetcher ?? fetch)("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(enquiryPayload(fields, accessKey, botcheck)),
      signal: controller.signal,
    })
    if (!response.ok) return "error"
    const result: unknown = await response.json()
    if (result && typeof result === "object" && "success" in result) {
      if (result.success === true) return "success"
      if (result.success === false) return "error"
    }
    return "uncertain"
  } catch {
    // A lost response does not prove that the service failed to accept the enquiry.
    return signal.aborted ? "cancelled" : "uncertain"
  } finally {
    clearTimeout(timer)
    signal.removeEventListener("abort", abort)
  }
}
