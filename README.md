# Cookies for Cancer

One-page donation site for [cookiesforcancer.org](https://cookiesforcancer.org). Apple Pay, Google Pay, Link, and cards via Stripe Embedded Checkout.

## Local

```bash
npm install
cp .env.example .env.local
# paste Stripe test keys into .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stripe

1. Create a [Stripe](https://dashboard.stripe.com) account.
2. Copy **Publishable** and **Secret** keys from Developers → API keys.
3. In Settings → Payment methods, keep **Cards**, **Apple Pay**, **Google Pay**, and **Link** on.
4. After the live domain is live, add `cookiesforcancer.org` under **Settings → Payment methods → Apple Pay** so the wallet button can show on this site (not only on Stripe’s domain).

## Host on Vercel

```bash
npx vercel login
npx vercel --prod
```

Then in the Vercel project:

**Settings → Environment Variables**

| Name | Value |
| --- | --- |
| `STRIPE_SECRET_KEY` | `sk_live_...` (use `sk_test_...` first) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `NEXT_PUBLIC_SITE_URL` | `https://cookiesforcancer.org` |
| `STRIPE_WEBHOOK_SECRET` | optional, from a webhook endpoint |

Redeploy after saving env vars.

### Point cookiesforcancer.org at Vercel

1. Vercel project → **Settings → Domains** → add `cookiesforcancer.org` and `www.cookiesforcancer.org`.
2. At your domain registrar, set:

   - `A` `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`

   Or use the exact records Vercel shows for the project.
3. After DNS is green, set `NEXT_PUBLIC_SITE_URL` to `https://cookiesforcancer.org` and redeploy.

### Webhook (optional)

Endpoint: `https://cookiesforcancer.org/api/webhook`

Events: `checkout.session.completed`, `checkout.session.async_payment_succeeded`

## Notes

- Do not set `payment_method_types: ['card']` on the Checkout Session. Automatic payment methods are what enable Apple Pay and Google Pay.
- This site does not claim 501(c)(3) status. Add EIN / tax-deductible copy only after the organization is registered.
