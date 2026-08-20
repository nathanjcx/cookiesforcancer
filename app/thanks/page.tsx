import Stripe from "stripe";
import { SiteHeader } from "@/components/SiteHeader";
import { ThanksHero } from "@/components/ThanksHero";

export const metadata = {
  title: "Thanks | Cookies for Cancer",
};

function formatAmount(cents: number, currency: string) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

async function getDonationAmount(
  sessionId?: string,
  paymentIntentId?: string,
) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  try {
    const stripe = new Stripe(key);

    if (sessionId?.startsWith("cs_")) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (
        typeof session.amount_total === "number" &&
        session.amount_total >= 100 &&
        (session.status === "complete" || session.payment_status === "paid")
      ) {
        return formatAmount(session.amount_total, session.currency || "usd");
      }
    }

    if (paymentIntentId?.startsWith("pi_")) {
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (intent.status === "succeeded" && intent.amount >= 100) {
        return formatAmount(intent.amount, intent.currency || "usd");
      }
    }
  } catch {
    return null;
  }

  return null;
}

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; payment_intent?: string }>;
}) {
  const params = await searchParams;
  const amount = await getDonationAmount(
    params.session_id,
    params.payment_intent,
  );

  return (
    <div className="shell">
      <SiteHeader />
      <main className="thanks">
        <ThanksHero />
        <h1>
          {amount
            ? `Thank you for your ${amount} donation!`
            : "Thank you for your donation!"}
        </h1>
        <p className="lede">Your contribution will make a difference</p>
      </main>
    </div>
  );
}
