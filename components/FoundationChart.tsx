const foundations = [
  {
    name: "New York Cancer Foundation",
    href: "https://nycancerfoundation.org/",
    percent: 55,
    color: "#2a1a12",
    ink: "#f6eee0",
    note: "Care, rides, and grants",
    mark: "/foundations/marks/nycf.png",
  },
  {
    name: "American Cancer Society",
    href: "https://www.cancer.org",
    percent: 18,
    color: "#5c3a26",
    ink: "#f6eee0",
    note: "Research and patient support",
    mark: "/foundations/marks/acs.svg",
  },
  {
    name: "St. Jude Children’s Research Hospital",
    href: "https://www.stjude.org",
    percent: 12,
    color: "#8a5a3c",
    ink: "#f6eee0",
    note: "Childhood cancer care",
    mark: "/foundations/marks/stjude.svg",
  },
  {
    name: "Susan G. Komen",
    href: "https://www.komen.org",
    percent: 8,
    color: "#c4896a",
    ink: "#2a1a12",
    note: "Breast cancer",
    mark: "/foundations/marks/komen.svg",
  },
  {
    name: "Leukemia & Lymphoma Society",
    href: "https://www.lls.org",
    percent: 7,
    color: "#e2c9a8",
    ink: "#2a1a12",
    note: "Blood cancers",
    mark: "/foundations/marks/lls.png",
  },
] as const;

export function FoundationChart() {
  const description = foundations
    .map((item) => `${item.percent}% to ${item.name}`)
    .join(". ");

  return (
    <div className="giving-chart">
      <p className="giving-caption">Of every $100 gifted</p>
      <div
        className="giving-stack"
        role="img"
        aria-label={description}
      >
        {foundations.map((foundation) => (
          <a
            key={foundation.name}
            className="giving-seg"
            href={foundation.href}
            target="_blank"
            rel="noreferrer"
            style={{
              flexGrow: foundation.percent,
              background: foundation.color,
              color: foundation.ink,
            }}
            title={`${foundation.name}, $${foundation.percent}`}
            aria-label={`${foundation.name}, $${foundation.percent}`}
          >
            {foundation.percent >= 12 ? (
              <span>${foundation.percent}</span>
            ) : null}
          </a>
        ))}
      </div>
      <ul className="giving-legend">
        {foundations.map((foundation) => (
          <li key={foundation.name}>
            <a
              className="giving-item"
              href={foundation.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="giving-icon">
                <img src={foundation.mark} alt="" />
              </span>
              <span className="giving-copy">
                <span className="giving-name">{foundation.name}</span>
                <span className="giving-note">{foundation.note}</span>
              </span>
              <span className="giving-share">${foundation.percent}</span>
              <span className="giving-track" aria-hidden="true">
                <span
                  className="giving-fill"
                  style={{
                    width: `${foundation.percent}%`,
                    background: foundation.color,
                  }}
                />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
