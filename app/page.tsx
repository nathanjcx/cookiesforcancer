import { CancerStats } from "@/components/CancerStats";
import { CareCarousel } from "@/components/CareCarousel";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <div className="shell">
      <SiteHeader current="home" />
      <main>
        <section className="hero">
          <h1>Let&apos;s fight cancer together, one cookie at a time</h1>
        </section>

        <CareCarousel />

        <section className="mission" aria-labelledby="mission-heading">
          <h2 id="mission-heading">Our mission</h2>
          <p>
            Proceeds go to cancer research and to programs that help families
            with rides, meals, rent, and other costs during treatment.
          </p>
        </section>

        <CancerStats />
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Cookies for Cancer</p>
      </footer>
    </div>
  );
}
