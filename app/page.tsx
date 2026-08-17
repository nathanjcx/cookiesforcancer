import Link from "next/link";
import { CareCarousel } from "@/components/CareCarousel";
import { FoundationLogos } from "@/components/FoundationLogos";
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

        <CareCarousel />

        <section className="mission" aria-labelledby="mission-heading">
          <p className="kicker" id="mission-heading">
            Our mission
          </p>
          <h2>We raise money with cookies so more people can get cancer care.</h2>
          <p>
            People have always shown up with cookies. A plate on a porch. A tin
            in a waiting room. Something warm when there isn&apos;t much else to
            say. Cookies for Cancer is built on that same instinct: a small,
            ordinary thing that can still do real work.
          </p>
          <p>
            Cancer research needs time. Families need rides, meals, a place to
            stay near treatment. Care teams need room to keep going. None of
            that is abstract. It is bills, hours, and people who should not have
            to carry it alone.
          </p>
          <p>
            So we keep the ask simple. You give. We put that gift into the
            fight. Every dollar goes to cancer foundations doing the work —
            labs, hospitals, and programs that help people get through a
            diagnosis.
          </p>
          <p>
            We rotate who we donate to each month so the money moves across the
            fight: breast cancer, childhood cancer, blood cancers, and the work
            that helps every kind of cancer. A cookie is not a cure. It is a
            way in. If you can give, give. We&apos;ll take it from here.
          </p>
          <Link className="btn btn-accent" href="/donate">
            Donate now
          </Link>
        </section>

        <section className="month" aria-labelledby="month-heading">
          <p className="kicker" id="month-heading">
            Foundation of the month
          </p>
          <h2>Breast cancer</h2>
          <p>This month we donate to Susan G. Komen.</p>
        </section>

        <section className="foundations" aria-labelledby="foundations-heading">
          <h2 id="foundations-heading">Foundations we've donated to</h2>
          <FoundationLogos />
        </section>
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Cookies for Cancer</p>
      </footer>
    </div>
  );
}
