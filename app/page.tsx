import { SiteHeader } from "@/components/SiteHeader";

const foundations = [
  {
    name: "New York Cancer Foundation",
    href: "https://nycancerfoundation.org/",
  },
  {
    name: "American Cancer Society",
    href: "https://www.cancer.org",
  },
  {
    name: "St. Jude Children’s Research Hospital",
    href: "https://www.stjude.org",
  },
  {
    name: "Susan G. Komen",
    href: "https://www.komen.org",
  },
  {
    name: "Leukemia & Lymphoma Society",
    href: "https://www.lls.org",
  },
];

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
          <h2>Foundations we donate to</h2>
          <p>
            The New York Cancer Foundation helps people in treatment with
            transportation and non-medical bills. The rest is shared with
            research and care partners.
          </p>
          <ul className="giving-list">
            {foundations.map((foundation) => (
              <li key={foundation.name}>
                <a href={foundation.href} target="_blank" rel="noreferrer">
                  {foundation.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Cookies for Cancer</p>
      </footer>
    </div>
  );
}
