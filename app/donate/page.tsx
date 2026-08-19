import { DonateCard } from "@/components/DonateCard";
import { SiteHeader } from "@/components/SiteHeader";
import { ensureWalletDomains } from "@/lib/stripe";

export const metadata = {
  title: "Donate | Cookies for Cancer",
  description: "Choose an amount and donate to Cookies for Cancer.",
};

export default async function DonatePage() {
  try {
    await ensureWalletDomains();
  } catch {
    /* Stripe keys missing in some environments */
  }

  return (
    <div className="shell">
      <SiteHeader current="donate" />
      <main className="donate-main">
        <DonateCard />
      </main>
    </div>
  );
}
