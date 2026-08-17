import { CookieMark } from "@/components/CookieMark";
import { DonateCard } from "@/components/DonateCard";

export default function HomePage() {
  return (
    <main className="page">
      <section className="hero-panel">
        <div className="hero-visual" aria-hidden="true">
          <span className="cookie cookie-lg">
            <CookieMark size={240} />
          </span>
          <span className="cookie cookie-md">
            <CookieMark size={108} />
          </span>
          <span className="cookie cookie-sm">
            <CookieMark size={72} />
          </span>
        </div>
        <div className="hero-copy">
          <h1>Donate today and help people facing cancer.</h1>
          <p>Your gift funds care, research, and hope.</p>
        </div>
      </section>

      <section className="form-panel">
        <header className="form-header">
          <a className="brand" href="/">
            <CookieMark size={36} />
            <span className="brand-name">Cookies for Cancer</span>
          </a>
        </header>
        <DonateCard />
        <footer className="footer">
          <p>© {new Date().getFullYear()} Cookies for Cancer</p>
        </footer>
      </section>
    </main>
  );
}
