import Link from "next/link";
import { CareCarousel } from "@/components/CareCarousel";
import { CookieScene } from "@/components/CookieScene";
import { FoundationChart } from "@/components/FoundationChart";
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
            ordinary thing that can still do real work. Cancer research needs
            time. Families need rides, meals, a place to stay near treatment.
            Care teams need room to keep going. None of that is abstract. It is
            bills, hours, and people who should not have to carry it alone.
          </p>
          <p>
            So we keep the ask simple. You give. We put that gift into the
            fight. Every dollar goes to cancer foundations doing the work —
            labs, hospitals, and programs that help people get through a
            diagnosis. Most of it goes to the New York Cancer Foundation, which
            helps people in treatment with rides, bills, and a place to stay.
            The rest is split with research and care partners. A cookie is not
            a cure. It is a way in. If you can give, give. We&apos;ll take it
            from here.
          </p>
          <Link className="btn btn-accent" href="/donate">
            Donate now
          </Link>
        </section>

        <section className="giving" aria-labelledby="giving-heading">
          <p className="kicker" id="giving-heading">
            Where gifts go
          </p>
          <h2>Most of every gift goes to the New York Cancer Foundation.</h2>
          <p>
            They help people in treatment with transportation and non-medical
            bills. The rest is shared with research and care partners.
          </p>
          <FoundationChart />
        </section>

        <CookieScene />
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Cookies for Cancer</p>
      </footer>
    </div>
  );
}
