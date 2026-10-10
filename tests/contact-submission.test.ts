import assert from "node:assert/strict"
import { test } from "node:test"
import { validateContact, enquiryPayload, submitEnquiry } from "../src/contactSubmission.ts"

const fields = { name: "Test Customer", email: "customer@example.com", phone: "+91 98765 43210", product: "Acne Fight Face Wash", message: "Test enquiry" }
test("all five fields reject missing/invalid values", () => {
  for (const field of Object.keys(fields)) assert.equal(validateContact({ ...fields, [field]: "   " })?.field, field)
  for (const email of ["invalid", "a@@example.com", "a b@example.com", "a@example"]) assert.equal(validateContact({ ...fields, email })?.field, "email")
  for (const phone of ["abc", "123", "1234567890123456", "0000000000", "12345<script>"]) assert.equal(validateContact({ ...fields, phone })?.field, "phone")
  assert.equal(validateContact({ ...fields, product: "Invented product" })?.field, "product")
  assert.equal(validateContact(fields), null)
})
test("payload is plain text, ordered, and has no recipient override or duplicate message fields", () => {
  const payload = enquiryPayload({ ...fields, message: "<b>Literal customer text</b>" }, "test-key", false)
  assert.equal(payload.message, "<b>Literal customer text</b>")
  assert.equal(payload.subject, "New Product Enquiry | Vital Glow")
  assert.equal(payload.from_name, "Vital Glow Website")
  assert.deepEqual(Object.keys(payload), ["access_key", "subject", "from_name", "name", "email", "phone", "product_enquiry", "message", "source", "website", "botcheck"])
})
test("success requires both HTTP success and boolean API confirmation", async () => {
  for (const [status, body, expected] of [[200, { success: true }, "success"], [200, { success: false }, "error"], [400, { success: true }, "error"], [200, { success: "true" }, "uncertain"], [200, {}, "uncertain"]] as const) {
    let calls = 0
    const fetcher: typeof fetch = async (url, init) => {
      calls++
      assert.equal(url, "https://api.web3forms.com/submit")
      assert.equal(init?.method, "POST")
      assert.equal(JSON.parse(init!.body as string).product_enquiry, fields.product)
      return new Response(JSON.stringify(body), { status })
    }
    assert.equal(await submitEnquiry(fields, false, new AbortController().signal, { fetcher, accessKey: "test-key" }), expected)
    assert.equal(calls, 1)
  }
})
test("missing key, honeypot and invalid fields never contact the API", async () => {
  const fetcher: typeof fetch = async () => { throw new Error("Unexpected API call") }
  assert.equal(await submitEnquiry(fields, false, new AbortController().signal, { fetcher, accessKey: "" }), "error")
  assert.equal(await submitEnquiry(fields, true, new AbortController().signal, { fetcher }), "error")
  assert.equal(await submitEnquiry({ ...fields, message: " " }, false, new AbortController().signal, { fetcher }), "error")
})
test("network/malformed responses stay uncertain; no automatic retry", async () => {
  let calls = 0
  const fetcher: typeof fetch = async () => { calls++; throw new TypeError("Network failure") }
  assert.equal(await submitEnquiry(fields, false, new AbortController().signal, { fetcher }), "uncertain")
  assert.equal(calls, 1)
  assert.equal(await submitEnquiry(fields, false, new AbortController().signal, { fetcher: async () => new Response("not JSON") }), "uncertain")
})
test("slow requests time out as uncertain; unmount aborts as cancelled", async () => {
  const fetcher: typeof fetch = (_url, init) => new Promise((_resolve, reject) => {
    init!.signal!.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true })
  })
  assert.equal(await submitEnquiry(fields, false, new AbortController().signal, { fetcher, timeoutMs: 5 }), "uncertain")
  const controller = new AbortController()
  const pending = submitEnquiry(fields, false, controller.signal, { fetcher })
  controller.abort()
  assert.equal(await pending, "cancelled")
})
