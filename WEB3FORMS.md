# Vital Glow contact delivery

The Contact form posts JSON to `https://api.web3forms.com/submit` using the public form identifier in `src/contactSubmission.ts`. No SMTP credentials or customer data are stored in the browser. The submission subject is **New Product Enquiry | Vital Glow**, with sender name **Vital Glow Website**.

Fields are sent once in this order: name, email, phone, product_enquiry, message, source, website. The standard Web3Forms email template determines the final presentation. The customer's `email` is the default reply-to; no recipient override or customer auto-response is configured. See https://docs.web3forms.com/getting-started/customizations/custom-reply-to.

## Dashboard checks before launch

- Confirm the supplied access key is associated with **vitalglow111@gmail.com**, and complete any email verification. The public submission endpoint does not expose the receiving inbox; repository checks cannot verify this association.
- If domain restrictions are enabled, permit **vitalglow111.com** (and only any intentionally supported hosts). Check plan limits and spam settings.
- Keep automatic customer confirmations disabled unless separately requested. A custom HTML email template is optional dashboard/plan configuration, not implemented or promised here.
- After explicit authorization, send one live test and verify receipt/reply-to in the expected inbox (including spam). An API success response confirms acceptance, not inbox delivery.

The requested hidden `botcheck` checkbox is included and checked locally. Web3Forms currently describes honeypot protection as deprecated/less effective; its server-side spam protection still applies. No CAPTCHA was added. See https://docs.web3forms.com/getting-started/customizations/spam-protection/spam-protection.

## Verification

- `node --experimental-strip-types --test tests/contact-submission.test.ts`
- `pnpm typecheck`
- `pnpm build`
- Browser checks used a temporary mock-only fixture, removed after verification. Loading, success, rejection, timeout uncertainty, duplicate prevention, focus trapping/restoration, Escape behavior, value preservation/clearing, Lenis pause/resume and unmount cleanup passed. Popup overflow checks passed at 320, 390, 768 and 1440px. No real email was sent.

The request times out after 25 seconds. Timeouts, unreadable responses and network failures preserve the form and explain that acceptance is unconfirmed; they never automatically retry. Explicit API rejection offers a manual retry. Success clears the five fields. Closing returns focus to Send Message. Native dialog semantics make background content inert; the existing Lenis instance pauses and resumes through a Contact-specific event without changing its configuration.
