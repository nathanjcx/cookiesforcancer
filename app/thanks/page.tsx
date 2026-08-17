import Link from "next/link";
import Stripe from "stripe";
import { CookieMark } from "@/components/CookieMark";

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

async function getDonationAmount(sessionId?: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !sessionId?.startsWith("cs_")) {
    return null;
  }

  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (
      typeof session.amount_total === "number" &&
      session.amount_total >= 100 &&
      (session.status === "complete" || session.payment_status === "paid")
    ) {
      return formatAmount(session.amount_total, session.currency || "usd");
    }
  } catch {
    return null;
  }

  return null;
}

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const amount = await getDonationAmount(sessionId);

  return (
    <main className="thanks">
      <div className="thanks-card">
        <CookieMark size={56} />
        <h1>Thanks for donating.</h1>
        {amount ? <p className="thanks-amount">{amount}</p> : null}
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
