import Link from "next/link";
import Stripe from "stripe";
import { CookieMark } from "@/components/CookieMark";
import { SiteHeader } from "@/components/SiteHeader";

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
        <CookieMark size={64} />
        <h1>You showed up.</h1>
        <p className="thanks-amount">{amount ?? "$5"}</p>
        <p className="lede">
          Your cookie is in the fight. Somewhere a lab stays funded a little
          longer, a family gets a ride, someone facing cancer gets more room
          to breathe.
        </p>
        <p className="lede">
          We take it from here. Go eat a cookie. We&apos;ll get this gift to
          the foundations we bake for.
        </p>
        <Link className="btn btn-ghost" href="/">
          Back home
        </Link>
      </main>
    </div>
  );
}
