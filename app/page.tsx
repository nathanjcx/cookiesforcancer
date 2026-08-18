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
          <h2>We raise money with cookies for cancer care.</h2>
          <p>
            Treatment affects more than health. Families also need help with
            rides, meals, rent, and time away from work.
          </p>
          <p>
            Donations go to research, patient care, and programs that help
            cover those costs.
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
