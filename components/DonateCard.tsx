"use client";

import { useEffect, useRef, useState } from "react";

export function DonateCard() {
  const [amount, setAmount] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [error, setError] = useState("");
  const mountRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<{ destroy: () => void } | null>(null);

  const selected = Number(amount);
  const valid = Number.isFinite(selected) && selected >= 1;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

  useEffect(() => {
    if (!checkout || !publishableKey) return;

    let cancelled = false;

    async function mountCheckout() {
      try {
        const { loadStripe } = await import("@stripe/stripe-js");
        const stripe = await loadStripe(publishableKey);
        if (!stripe || cancelled) return;

        const embedded = await stripe.initEmbeddedCheckout({
          fetchClientSecret: async () => {
            const response = await fetch("/api/checkout", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: selected }),
            });
            const data = (await response.json()) as {
              clientSecret?: string;
              error?: string;
            };
            if (!response.ok || !data.clientSecret) {
              throw new Error(data.error || "Could not start checkout.");
            }
            return data.clientSecret;
          },
        });

        if (cancelled) {
          embedded.destroy();
          return;
        }

        checkoutRef.current = embedded;
        if (mountRef.current) {
          embedded.mount(mountRef.current);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Checkout failed.");
          setCheckout(false);
        }
      }
    }

    void mountCheckout();

    return () => {
      cancelled = true;
      checkoutRef.current?.destroy();
      checkoutRef.current = null;
    };
  }, [checkout, publishableKey, selected]);

  function startCheckout() {
    setError("");
    if (!valid) {
      setError("Enter at least $1.");
      return;
    }
    if (!publishableKey) {
      setError(
        "Stripe keys are not set yet. Add them in Vercel env vars to accept donations.",
      );
      return;
    }
    setCheckout(true);
  }

  return (
    <div className="form" id="donate">
      {!publishableKey ? (
        <p className="setup">Add Stripe keys to start accepting donations.</p>
      ) : null}

      {checkout ? (
        <>
          <button
            className="back"
            type="button"
            onClick={() => setCheckout(false)}
          >
            ← Change amount
          </button>
          {error ? <p className="error">{error}</p> : null}
          <div className="checkout" ref={mountRef} />
        </>
      ) : (
        <>
          <p className="field-label">Amount</p>
          <label className="custom">
            <span>$</span>
            <input
              inputMode="decimal"
              placeholder="Enter donation amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              aria-label="Donation amount"
            />
          </label>

          {error ? <p className="error">{error}</p> : null}

          {valid ? (
            <p className="total">
              Total donation{" "}
              <strong>${selected.toFixed(selected % 1 ? 2 : 0)}</strong>
            </p>
          ) : null}

          <button className="donate" type="button" onClick={startCheckout}>
            Donate
          </button>
        </>
      )}
    </div>
  );
}
