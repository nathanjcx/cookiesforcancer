import { CookieMark } from "@/components/CookieMark";
import { DonateCard } from "@/components/DonateCard";

export default function HomePage() {
  return (
    <main className="page">
      <header className="form-header">
        <a className="brand" href="/">
          <CookieMark size={36} />
          <h1 className="brand-name">Cookies for Cancer</h1>
        </a>
      </header>
      <DonateCard />
    </main>
  );
}
