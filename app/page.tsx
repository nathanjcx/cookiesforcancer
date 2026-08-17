import Link from "next/link";
import { CookieMark } from "@/components/CookieMark";

export default function HomePage() {
  return (
    <main className="home">
      <header className="site-header">
        <a className="brand" href="/">
          <CookieMark size={36} />
          <span className="brand-name">Cookies for Cancer</span>
        </a>
        <Link className="header-donate" href="/donate">
          Donate
        </Link>
      </header>

      <section className="hero">
        <div className="hero-cookie">
          <CookieMark size={84} />
        </div>
        <h1 className="hero-title">Donate to help people facing cancer.</h1>
        <p className="hero-copy">
          Your gift supports research, care, and families who need it.
        </p>
        <Link className="hero-donate" href="/donate">
          Donate now
        </Link>
      </section>

      <section className="causes" aria-label="Where donations go">
        <article className="cause">
          <p className="cause-label">We donate to</p>
          <h2>American Cancer Society</h2>
          <p>A share of every gift goes to the American Cancer Society.</p>
        </article>
      </section>
    </main>
  );
}
