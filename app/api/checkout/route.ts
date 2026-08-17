import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const MIN_CENTS = 100;
const MAX_CENTS = 5_000_000;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

function siteUrl(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    "http://localhost:3000"
  );
}

export async function POST(request: NextRequest) {
  let body: { amount?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const dollars = Number(body.amount);
  const cents = Math.round(dollars * 100);
  if (!Number.isFinite(cents) || cents < MIN_CENTS) {
    return NextResponse.json(
      { error: "Minimum donation is $1." },
      { status: 400 },
    );
  }
  if (cents > MAX_CENTS) {
    return NextResponse.json(
      { error: "Please contact us for gifts over $50,000." },
      { status: 400 },
    );
  }

  const productId = process.env.STRIPE_PRODUCT_ID;
  const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
    currency: "usd",
    unit_amount: cents,
    ...(productId
      ? { product: productId }
      : {
          product_data: {
            name: "Donation to Cookies for Cancer",
            description: "Thank you for baking hope.",
          },
        }),
  };

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      submit_type: "donate",
      billing_address_collection: "auto",
      customer_creation: "if_required",
      line_items: [
        {
          quantity: 1,
          price_data: priceData,
        },
      ],
      return_url: `${siteUrl(request)}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Checkout did not return a client secret." },
        { status: 500 },
      );
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
