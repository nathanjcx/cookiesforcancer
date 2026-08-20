function PeopleGraphic() {
  return (
    <svg viewBox="0 0 88 72" className="stat-svg" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => {
        const filled = index < 2;
        const x = 6 + index * 16.5;
        return (
          <g key={index} transform={`translate(${x} 10)`}>
            <circle
              cx="6.5"
              cy="6"
              r="4.4"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M1 29.5c0-7.2 2.5-11.6 5.5-11.6s5.5 4.4 5.5 11.6"
              fill={filled ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
}

function YearGraphic() {
  return (
    <svg viewBox="0 0 88 72" className="stat-svg" aria-hidden="true">
      <line
        x1="10"
        y1="54"
        x2="78"
        y2="54"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.22"
      />
      {Array.from({ length: 12 }, (_, index) => (
        <rect
          key={index}
          x={12 + index * 5.5}
          y="18"
          width="3.4"
          height="36"
          rx="0.8"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function SurvivorsGraphic() {
  return (
    <svg viewBox="0 0 88 72" className="stat-svg" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => {
        const col = index % 6;
        const row = Math.floor(index / 6);
        const filled = index === 0;
        return (
          <circle
            key={index}
            cx={14 + col * 12}
            cy={18 + row * 18}
            r="4.2"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.4"
          />
        );
      })}
    </svg>
  );
}

function SurvivalGraphic() {
  const outer = 24;
  const inner = 14;
  const outerC = 2 * Math.PI * outer;
  const innerC = 2 * Math.PI * inner;

  return (
    <svg viewBox="0 0 88 72" className="stat-svg" aria-hidden="true">
      <g transform="translate(44 38)">
        <circle
          r={outer}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          opacity="0.12"
        />
        <circle
          className="stat-ring-now"
          r={outer}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeDasharray={`${outerC * 0.69} ${outerC}`}
          transform="rotate(-90)"
        />
        <circle
          r={inner}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          opacity="0.12"
        />
        <circle
          r={inner}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray={`${innerC * 0.39} ${innerC}`}
          opacity="0.4"
          transform="rotate(-90)"
        />
      </g>
    </svg>
  );
}

const stats = [
  {
    value: "2 in 5",
    label: "Americans will develop cancer in their lifetime",
    Graphic: PeopleGraphic,
  },
  {
    value: "2 million",
    label: "people in the US expected to be diagnosed this year — about 5,600 a day",
    Graphic: YearGraphic,
  },
  {
    value: "18.6 million",
    label: "cancer survivors living in the US — about 1 in 18 people",
    Graphic: SurvivorsGraphic,
  },
  {
    value: "69%",
    label: "five-year survival now, up from 39% in the 1960s",
    Graphic: SurvivalGraphic,
  },
];

export function CancerStats() {
  return (
    <section className="stats" aria-labelledby="stats-heading">
      <h2 id="stats-heading">Cancer in numbers</h2>
      <p>
        Cancer is one of the most common serious illnesses in the United
        States, and research and care keep changing the odds.
      </p>
      <ul className="stats-grid">
        {stats.map(({ value, label, Graphic }) => (
          <li className="stat" key={value}>
            <div className="stat-graphic" aria-hidden="true">
              <Graphic />
            </div>
            <div className="stat-copy">
              <p className="stat-value">{value}</p>
              <p className="stat-label">{label}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="stats-source">
        Figures from the{" "}
        <a
          href="https://www.cancer.org/research/cancer-facts-statistics/all-cancer-facts-figures/2025-cancer-facts-figures.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          American Cancer Society, 2025
        </a>
        . Survival is the five-year relative rate for all cancers combined.
      </p>
    </section>
  );
}
