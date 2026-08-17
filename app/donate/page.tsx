import { CookieMark } from "@/components/CookieMark";
import { DonateCard } from "@/components/DonateCard";

export const metadata = {
  title: "Donate | Cookies for Cancer",
  description: "Choose an amount and donate to Cookies for Cancer.",
};

export default function DonatePage() {
  return (
    <main className="page">
      <header className="form-header">
        <a className="brand" href="/">
          <CookieMark size={36} />
          <span className="brand-name">Cookies for Cancer</span>
        </a>
      </header>
      <DonateCard />
    </main>
  );
}
