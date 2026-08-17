const foundations = [
  {
    name: "American Cancer Society",
    href: "https://www.cancer.org",
    src: "/foundations/acs.svg",
  },
  {
    name: "St. Jude Children’s Research Hospital",
    href: "https://www.stjude.org",
    src: "/foundations/stjude.svg",
  },
  {
    name: "Susan G. Komen",
    href: "https://www.komen.org",
    src: "/foundations/komen.svg",
  },
  {
    name: "Leukemia & Lymphoma Society",
    href: "https://www.lls.org",
    src: "/foundations/lls.jpg",
  },
];

export function FoundationLogos() {
  return (
    <ul className="foundation-logos">
      {foundations.map((foundation) => (
        <li key={foundation.name}>
          <a
            className="foundation-logo"
            href={foundation.href}
            target="_blank"
            rel="noreferrer"
          >
            <img src={foundation.src} alt={foundation.name} />
          </a>
        </li>
      ))}
    </ul>
  );
}
