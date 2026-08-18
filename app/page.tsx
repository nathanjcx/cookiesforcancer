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
            Cancer does not only ask for strength. It asks for rides at dawn,
            meals nobody has the energy to cook, and rent that still comes due
            while someone sits through treatment. Families wait. Kids try to
            stay brave. The people who love them keep showing up, even when
            there is little left to say.
          </p>
          <p>
            Cookies for Cancer is that same showing-up, turned into help.
            Every gift goes to research that needs more time, care that needs
            more hands, and families who need a ride, a meal, or a place to
            stay near the hospital. A cookie is a small way to stand with
            someone. Your gift is how that care becomes real — so no one has
            to carry a diagnosis alone.
          </p>
          <Link className="btn btn-accent" href="/donate">
            Donate now
          </Link>
        </section>

        <section className="giving" aria-labelledby="giving-heading">
          <p className="kicker" id="giving-heading">
            Where gifts go
          </p>
          <h2>Foundations we donate to</h2>
          <p>
            The New York Cancer Foundation helps people in treatment with
            transportation and non-medical bills. The rest is shared with
            research and care partners.
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
