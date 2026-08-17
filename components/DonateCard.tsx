"use client";

import { useCallback, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

const PRESETS = [
  { amount: 25, label: "Bake a batch" },
  { amount: 50, label: "Fill a tin" },
  { amount: 100, label: "Stock the oven" },
  { amount: 250, label: "Fuel a research day" },
];

export function DonateCard() {
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [error, setError] = useState("");

  const selected = custom ? Number(custom) : amount;
  const valid = Number.isFinite(selected) && selected >= 1;

  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: selected,
        frequency,
      }),
    });
    const data = (await response.json()) as {
      clientSecret?: string;
      error?: string;
    };
    if (!response.ok || !data.clientSecret) {
      throw new Error(data.error || "Could not start checkout.");
    }
    return data.clientSecret;
  }, [frequency, selected]);

  const options = useMemo(
    () => ({ fetchClientSecret }),
    [fetchClientSecret],
  );

  function startCheckout() {
    setError("");
    if (!valid) {
      setError("Enter at least $1.");
      return;
    }
    if (!stripePromise) {
      setError(
        "Stripe keys are not set yet. Add them in Vercel env vars to accept donations.",
      );
      return;
    }
    setCheckout(true);
  }

  return (
    <aside className="card" id="donate">
      <h2>Give in one tap</h2>
      <p className="card-sub">
        Apple Pay, Google Pay, Link, and cards — all on this page.
      </p>

      {!publishableKey ? (
        <p className="setup">
          Payments are ready to go once Stripe keys are added on Vercel. The
          page and checkout flow are already wired.
        </p>
      ) : null}

      {checkout && stripePromise ? (
        <>
          <button
            className="back"
            type="button"
            onClick={() => setCheckout(false)}
          >
            ← Change amount
          </button>
          <div className="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </>
      ) : (
        <>
          <div className="freq" role="group" aria-label="Donation frequency">
            <button
              type="button"
              aria-pressed={frequency === "once"}
              onClick={() => setFrequency("once")}
            >
              One-time
            </button>
            <button
              type="button"
              aria-pressed={frequency === "monthly"}
              onClick={() => setFrequency("monthly")}
            >
              Monthly
            </button>
          </div>

          <div className="amounts" role="group" aria-label="Donation amount">
            {PRESETS.map((preset) => (
              <button
                key={preset.amount}
                type="button"
                aria-pressed={!custom && amount === preset.amount}
                onClick={() => {
                  setAmount(preset.amount);
                  setCustom("");
                }}
              >
                <strong>${preset.amount}</strong>
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          <label className="custom">
            <span>$</span>
            <input
              inputMode="decimal"
              placeholder="Other amount"
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
              aria-label="Custom donation amount"
            />
          </label>

          {error ? <p className="error">{error}</p> : null}

          <button
            className="donate"
            type="button"
            onClick={startCheckout}
          >
            {`Donate $${valid ? selected : 0}${frequency === "monthly" ? "/mo" : ""}`}
          </button>
          <p className="pay-note">
            Secure checkout by Stripe. You stay on this page.
          </p>
          <div className="wallets">
            <span className="wallet">Apple Pay</span>
            <span className="wallet">Google Pay</span>
            <span className="wallet">Link</span>
            <span className="wallet">Card</span>
          </div>
        </>
      )}
    </aside>
  );
}
