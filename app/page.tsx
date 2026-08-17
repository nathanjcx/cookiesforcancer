import { CookieMark } from "@/components/CookieMark";
import { DonateCard } from "@/components/DonateCard";

export default function HomePage() {
  return (
    <main className="page">
      <span className="crumb" style={{ top: 90, left: "8%" }} />
      <span className="crumb" style={{ top: 140, left: "18%" }} />
      <span className="crumb" style={{ top: 70, right: "22%" }} />
      <span className="crumb" style={{ bottom: 180, left: "12%" }} />
      <span className="crumb" style={{ bottom: 90, right: "16%" }} />

      <div className="wrap">
        <header className="nav">
          <a className="brand" href="/">
            <CookieMark />
            <span className="brand-name">Cookies for Cancer</span>
          </a>
          <p className="nav-note">cookiesforcancer.org</p>
        </header>

        <section className="hero">
          <div>
            <p className="kicker">One page. One gift. Real help.</p>
            <h1>
              Bake hope.
              <br />
              <em>Fund the fight.</em>
            </h1>
            <p className="lede">
              This is a single place to donate — Apple Pay, Google Pay, Link, or
              card. No account. No extra pages. Just a gift that helps people
              facing cancer.
            </p>
            <div className="pills">
              <span className="pill">Apple Pay & Google Pay</span>
              <span className="pill">Cards & Link</span>
              <span className="pill">One-time or monthly</span>
            </div>
            <div className="story">
              <p>
                Cookies are how people show up for each other — a tin on a
                porch, a plate in a hospital room, a dozen passed down a
                hallway. This site turns that instinct into a donation in
                seconds.
              </p>
              <p>
                Every dollar goes toward supporting people affected by cancer.
                Give $25 or $250. Give once or every month. The checkout stays
                right here.
              </p>
            </div>
          </div>

          <DonateCard />
        </section>

        <section className="stats" aria-label="Why this page exists">
          <div className="stat">
            <strong>1 page</strong>
            <span>Nothing to hunt for. The donate box is the site.</span>
          </div>
          <div className="stat">
            <strong>Wallets ready</strong>
            <span>Pay the way you already pay — Apple, Google, card.</span>
          </div>
          <div className="stat">
            <strong>Stripe secure</strong>
            <span>Card details never touch this website.</span>
          </div>
        </section>

        <footer className="footer">
          <p>
            Payments are processed by Stripe. Apple Pay and Google Pay appear
            automatically on supported devices after the domain is verified.
          </p>
          <p>© {new Date().getFullYear()} Cookies for Cancer</p>
        </footer>
      </div>
    </main>
  );
}
