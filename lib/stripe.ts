import Stripe from "stripe";
import type { NextRequest } from "next/server";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

function hostsToRegister(request?: NextRequest) {
  const hosts = new Set<string>([
    "cookiesforcancer.org",
    "www.cookiesforcancer.org",
  ]);

  if (request) {
    for (const raw of [
      process.env.NEXT_PUBLIC_SITE_URL,
      request.headers.get("origin"),
      request.headers.get("referer"),
      request.headers.get("host")
        ? `https://${request.headers.get("host")}`
        : null,
    ]) {
      if (!raw) continue;
      try {
        hosts.add(new URL(raw).hostname);
      } catch {
        /* ignore */
      }
    }
  }

  return [...hosts].filter(
    (host) =>
      host &&
      host !== "localhost" &&
      !host.startsWith("127.") &&
      !host.endsWith(".localhost"),
  );
}

export async function ensureWalletDomains(request?: NextRequest) {
  const stripe = getStripe();
  const hosts = hostsToRegister(request);
  if (hosts.length === 0) return;

  const existing = await stripe.paymentMethodDomains.list({ limit: 100 });
  const byName = new Map(
    existing.data.map((domain) => [domain.domain_name, domain]),
  );

  await Promise.all(
    hosts.map(async (domain_name) => {
      let domain = byName.get(domain_name);
      try {
        if (!domain) {
          domain = await stripe.paymentMethodDomains.create({
            domain_name,
            enabled: true,
          });
        } else if (!domain.enabled) {
          domain = await stripe.paymentMethodDomains.update(domain.id, {
            enabled: true,
          });
        }
        await stripe.paymentMethodDomains.validate(domain.id);
      } catch {
        /* already registered, or Apple Pay file not reachable yet */
      }
    }),
  );
}
