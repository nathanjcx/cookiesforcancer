"use client";

import { useEffect, useId, useRef, useState } from "react";

export function DonateCard() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [ready, setReady] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<{ destroy: () => void } | null>(null);
  const errorId = useId();
  const hintId = useId();

  const selected = Number(amount);
  const empty = amount.trim() === "";
  const valid = Number.isFinite(selected) && selected >= 1;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

  useEffect(() => {
    if (!checkout || !publishableKey) return;

    let cancelled = false;
    setReady(false);

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
        if (!cancelled) setReady(true);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Checkout failed.");
          setCheckout(false);
          setReady(false);
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
      setError("Donations are not available yet.");
      return;
    }
    setCheckout(true);
  }

  function closeCheckout() {
    setCheckout(false);
    setReady(false);
  }

  return (
    <div className="form" id="donate">
      {!publishableKey ? (
        <p className="notice" role="status">
          Donations are not available yet.
        </p>
      ) : null}

      {checkout ? (
        <>
          <button
            className="btn btn-ghost btn-back"
            type="button"
            onClick={closeCheckout}
          >
            Change amount
          </button>
          {error ? (
            <p className="error" role="alert">
              {error}
            </p>
          ) : null}
          <div className="checkout-wrap" aria-busy={!ready}>
            {!ready ? (
              <div className="checkout-pending" role="status">
                <span className="progress" aria-hidden="true" />
                <p>Loading checkout</p>
              </div>
            ) : null}
            <div
              className="checkout"
              ref={mountRef}
              data-ready={ready ? "true" : "false"}
            />
          </div>
        </>
      ) : (
        <>
          <header className="donate-intro">
            <h1>Enter an amount.</h1>
          </header>
          <label className="field-label" htmlFor="donation-amount">
            Amount
          </label>
          <div className={`amount-field${error && !valid ? " is-invalid" : ""}`}>
            <span aria-hidden="true">$</span>
            <input
              id="donation-amount"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                if (error) setError("");
              }}
              aria-invalid={Boolean(error && !valid)}
              aria-describedby={
                [!empty ? hintId : null, error ? errorId : null]
                  .filter(Boolean)
                  .join(" ") || undefined
              }
            />
          </div>
          {!empty ? (
            <p className="field-hint" id={hintId}>
              {valid
                ? `Total ${selected.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: selected % 1 ? 2 : 0,
                  })}`
                : "Minimum $1."}
            </p>
          ) : null}

          {error ? (
            <p className="error" id={errorId} role="alert">
              {error}
            </p>
          ) : null}

          <button
            className="btn btn-accent btn-block"
            type="button"
            onClick={startCheckout}
            disabled={!valid || !publishableKey}
          >
            Donate
          </button>
        </>
      )}
    </div>
  );
}
