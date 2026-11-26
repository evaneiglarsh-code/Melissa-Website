"use client";

import { useEffect, useState, type FormEvent } from "react";

export default function NewsletterSignup() {
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/newsletter", { signal: controller.signal, cache: "no-store" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.enabled === true) setVisible(true); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const email = new FormData(form).get("email");
    setPending(true);
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true }),
      });
      if (!res.ok) {
        setMessage(res.status === 429 ? "Too many attempts. Please try again later." : "We couldn't complete your signup. Please try again later.");
        return;
      }
      form.reset();
      setMessage("Thanks for signing up. If you receive a confirmation email, follow the link to finish.");
    } catch {
      setMessage("We couldn't complete your signup. Please try again later.");
    } finally {
      setPending(false);
    }
  }

  if (!visible) return null;

  return (
    <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter-inner shell">
        <p className="eyebrow">Email updates</p>
        <h2 id="newsletter-title">Stay in the know</h2>
        <p className="newsletter-description">Get exclusive updates on Melissa’s upcoming events, shows, and offerings.</p>
        <form onSubmit={subscribe} aria-describedby="newsletter-consent">
          <label htmlFor="newsletter-email">Email address</label>
          <div className="newsletter-fields">
            <input id="newsletter-email" name="email" type="email" autoComplete="email" maxLength={254} required />
            <button className="square-button" type="submit" disabled={pending}>{pending ? "Signing up…" : "Sign me up"}</button>
          </div>
          <p className="newsletter-consent" id="newsletter-consent">By signing up, you agree to receive email updates from Melissa Cubillas. Unsubscribe anytime.</p>
          <p className="newsletter-status" role="status">{message}</p>
        </form>
      </div>
    </section>
  );
}
