import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { ensureWalletDomains, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const MIN_CENTS = 100;
const MAX_CENTS = 5_000_000;

function siteUrl(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    "http://localhost:3000"
  );
}

function donationCents(amount: unknown) {
  const dollars = Number(amount);
  const cents = Math.round(dollars * 100);
  if (!Number.isFinite(cents) || cents < MIN_CENTS) {
    return { error: "Minimum donation is $1." };
  }
  if (cents > MAX_CENTS) {
    return { error: "Please contact us for gifts over $50,000." };
  }
  return { cents };
}

export async function POST(request: NextRequest) {
  let body: { amount?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = donationCents(body.amount);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const productId = process.env.STRIPE_PRODUCT_ID;

  try {
    const stripe = getStripe();
    await ensureWalletDomains(request);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      submit_type: "donate",
      billing_address_collection: "auto",
      customer_creation: "if_required",
      branding_settings: {
        display_name: "Cookies for Cancer",
        background_color: "#f6eee0",
        button_color: "#1a140f",
        border_style: "rounded",
        font_family: "inter",
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: parsed.cents,
            ...(productId
              ? { product: productId }
              : {
                  product_data: {
                    name: "Donation to Cookies for Cancer",
                    description: "Thank you for baking hope.",
                  },
                }),
          },
        },
      ],
      return_url: `${siteUrl(request)}/thanks?session_id={CHECKOUT_SESSION_ID}`,
    } as Stripe.Checkout.SessionCreateParams);

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
