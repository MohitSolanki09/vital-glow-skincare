import { useEffect, useRef, type RefObject } from "react"
import { createPortal } from "react-dom"
import "./contact-submission-dialog.css"

export type DialogState = "sending" | "success" | "error" | "uncertain"
const content = {
  sending: { title: "Sending your enquiry...", description: "Please wait while we submit your message." },
  success: { title: "Thank You!", description: "Your enquiry has been submitted successfully. The Vital Glow team will get back to you soon." },
  error: { title: "Message Not Sent", description: "We couldn't submit your enquiry right now. Please try again." },
  uncertain: { title: "Submission Status Unconfirmed", description: "We couldn't confirm the response. Your enquiry may have been accepted. Please contact vitalglow111@gmail.com before resending to avoid a duplicate." },
}

export function ContactSubmissionDialog({ state, onClose, onRetry, trigger }: {
  state: DialogState; onClose: () => void; onRetry: () => void; trigger: RefObject<HTMLButtonElement | null>
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const actionRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current!
    const root = document.documentElement
    const oldOverflow = root.style.overflow
    const oldPadding = root.style.paddingRight
    const gutter = Math.max(0, window.innerWidth - root.clientWidth)
    const padding = Number.parseFloat(getComputedStyle(root).paddingRight) || 0
    dialog.showModal()
    // The existing Lenis instance listens for this event; no second instance/RAF.
    window.dispatchEvent(new Event("vital-glow:contact-modal"))
    root.style.overflow = "hidden"
    root.style.paddingRight = `${padding + gutter}px`
    titleRef.current?.focus({ preventScroll: true })
    return () => {
      dialog.close()
      root.style.overflow = oldOverflow
      root.style.paddingRight = oldPadding
      window.dispatchEvent(new Event("vital-glow:contact-modal"))
      trigger.current?.focus({ preventScroll: true })
    }
  }, [trigger])
  useEffect(() => {
    if (state !== "sending") actionRef.current?.focus({ preventScroll: true })
  }, [state])
  const copy = content[state]
  return createPortal(
    <dialog ref={dialogRef} className="contact-submission-dialog" aria-modal="true"
      aria-labelledby="contact-dialog-title" aria-describedby="contact-dialog-description"
      data-lenis-prevent onCancel={event => { event.preventDefault(); if (state !== "sending") onClose() }}
      onKeyDown={event => {
        if (event.key !== "Tab") return
        const buttons = [...(dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)") ?? [])]
        const first = buttons[0], last = buttons[buttons.length - 1]
        if (!first) { event.preventDefault(); titleRef.current?.focus(); return }
        if (event.shiftKey && (document.activeElement === first || document.activeElement === titleRef.current)) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }}>
      <div className="contact-submission-dialog__icon" data-state={state} aria-hidden="true">
        {state === "sending" ? <span className="contact-submission-dialog__spinner" /> : state === "success" ?
          <svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4 10-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> : <span>!</span>}
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        <h2 id="contact-dialog-title" ref={titleRef} tabIndex={-1}>{copy.title}</h2>
        <p id="contact-dialog-description">{copy.description}</p>
      </div>
      {state !== "sending" && <div className="contact-submission-dialog__actions">
        <button ref={actionRef} type="button" className="contact-submission-dialog__action" onClick={state === "error" ? onRetry : onClose}>{state === "error" ? "TRY AGAIN" : "DONE"}</button>
        {state === "error" && <button type="button" className="contact-submission-dialog__close" onClick={onClose}>Close</button>}
      </div>}
    </dialog>, document.body,
  )
}
