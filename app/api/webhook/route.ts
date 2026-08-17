import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!secret || !key) {
    return NextResponse.json(
      { error: "Webhook is not configured." },
      { status: 501 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const stripe = new Stripe(key);
  const payload = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, secret);
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      const session = event.data.object;
      console.log("donation_completed", {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        mode: session.mode,
        customer_email: session.customer_details?.email,
      });
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
