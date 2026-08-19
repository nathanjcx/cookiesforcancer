import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <div className="shell">
      <SiteHeader current="home" />
      <main>
        <section className="hero">
          <h1>Help fight cancer with cookies</h1>
          <p className="lede">
            Your gift supports research, care, and families who need it.
          </p>
        </section>

        <section className="mission" aria-labelledby="mission-heading">
          <p className="kicker" id="mission-heading">
            Our mission
          </p>
          <h2>Cookies fund cancer care.</h2>
          <p>
            Proceeds go to cancer research and to programs that help families
            with rides, meals, rent, and other costs during treatment.
          </p>
        </section>

        <section className="giving" aria-labelledby="giving-heading">
          <p className="kicker" id="giving-heading">
            Where gifts go
          </p>
          <h2>All proceeds go to local care.</h2>
          <p>
            Gifts support local cancer research and patient care, like the{" "}
            <a href="https://nycancerfoundation.org/" target="_blank" rel="noreferrer">
              New York Cancer Foundation
            </a>
            .
          </p>
        </section>
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Cookies for Cancer</p>
      </footer>
    </div>
  );
}
