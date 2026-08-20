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

        <section className="home-note">
          <p className="lede">
            Your gift supports research, care, and families who need it.
          </p>
        </section>
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Cookies for Cancer</p>
      </footer>
    </div>
  );
}
