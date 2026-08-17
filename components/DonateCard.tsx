"use client";

import { useCallback, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export function DonateCard() {
  const [amount, setAmount] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [error, setError] = useState("");

  const selected = Number(amount);
  const valid = Number.isFinite(selected) && selected >= 1;

  const fetchClientSecret = useCallback(async () => {
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
  }, [selected]);

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
    <div className="form" id="donate">
      {!publishableKey ? (
        <p className="setup">
          Add Stripe keys to start accepting donations.
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
              Total donation <strong>${selected.toFixed(selected % 1 ? 2 : 0)}</strong>
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
