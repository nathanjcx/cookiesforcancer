const foundations = [
  {
    name: "New York Cancer Foundation",
    href: "https://nycancerfoundation.org/",
    percent: 55,
    color: "#3a2214",
    note: "Care, rides, and grants",
    mark: "/foundations/marks/nycf.png",
  },
  {
    name: "American Cancer Society",
    href: "https://www.cancer.org",
    percent: 18,
    color: "#6b3e22",
    note: "Research and patient support",
    mark: "/foundations/marks/acs.svg",
  },
  {
    name: "St. Jude Children’s Research Hospital",
    href: "https://www.stjude.org",
    percent: 12,
    color: "#8f5c3a",
    note: "Childhood cancer care",
    mark: "/foundations/marks/stjude.svg",
  },
  {
    name: "Susan G. Komen",
    href: "https://www.komen.org",
    percent: 8,
    color: "#c4896a",
    note: "Breast cancer",
    mark: "/foundations/marks/komen.svg",
  },
  {
    name: "Leukemia & Lymphoma Society",
    href: "https://www.lls.org",
    percent: 7,
    color: "#e0b07a",
    note: "Blood cancers",
    mark: "/foundations/marks/lls.png",
  },
] as const;

const CX = 100;
const CY = 100;
const R_OUT = 86;
const R_IN = 50;
const GAP = 2.8;
const DOUGH = "#e8b56d";
const DOUGH_CENTER = "#f3c98a";
const INK = "#2a1a12";
const CHIP = "#3a2214";
const CHIP_LIT = "#7a4a28";

function polar(r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)] as const;
}

function donutPath(start: number, end: number) {
  const large = end - start > 180 ? 1 : 0;
  const [ox1, oy1] = polar(R_OUT, start);
  const [ox2, oy2] = polar(R_OUT, end);
  const [ix2, iy2] = polar(R_IN, end);
  const [ix1, iy1] = polar(R_IN, start);
  const f = (n: number) => n.toFixed(2);
  return `M ${f(ox1)} ${f(oy1)} A ${R_OUT} ${R_OUT} 0 ${large} 1 ${f(ox2)} ${f(oy2)} L ${f(ix2)} ${f(iy2)} A ${R_IN} ${R_IN} 0 ${large} 0 ${f(ix1)} ${f(iy1)} Z`;
}

const span = 360 - GAP * foundations.length;
const slices = foundations.map((foundation, index) => {
  const start =
    foundations
      .slice(0, index)
      .reduce((sum, item) => sum + (item.percent / 100) * span + GAP, 0) +
    GAP / 2;
  const sweep = (foundation.percent / 100) * span;
  return { ...foundation, d: donutPath(start, start + sweep) };
});

const chips = [
  { a: 22, r: 68, s: 1.12, rot: -22, kind: "square" as const },
  { a: 58, r: 74, s: 0.52, rot: 12, kind: "round" as const },
  { a: 92, r: 67, s: 1, rot: 18, kind: "square" as const },
  { a: 128, r: 73, s: 0.48, rot: 0, kind: "round" as const },
  { a: 164, r: 68, s: 1.08, rot: -12, kind: "square" as const },
  { a: 208, r: 75, s: 0.5, rot: 28, kind: "round" as const },
  { a: 248, r: 69, s: 0.96, rot: 14, kind: "square" as const },
  { a: 292, r: 74, s: 0.46, rot: 0, kind: "round" as const },
  { a: 328, r: 70, s: 0.88, rot: -16, kind: "square" as const },
];

function Chip({
  a,
  r,
  s,
  rot,
  kind,
}: {
  a: number;
  r: number;
  s: number;
  rot: number;
  kind: "square" | "round";
}) {
  const [x, y] = polar(r, a);
  return (
    <g
      className="giving-chip"
      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${s})`}
    >
      {kind === "square" ? (
        <rect x="-6.2" y="-6.2" width="12.4" height="12.4" rx="3.4" fill={CHIP} />
      ) : (
        <circle r="4.4" fill={CHIP} />
      )}
      <path
        d={kind === "square" ? "M -3.1 -3.4 Q -0.6 -4.4 2.1 -2" : "M -1.8 -1.6 Q 0 -2.4 1.6 -0.6"}
        fill="none"
        stroke={CHIP_LIT}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  );
}

export function FoundationChart() {
  const majority = foundations[0];

  return (
    <div className="giving-chart">
      <div className="giving-ring">
        <svg
          viewBox="0 0 200 200"
          role="img"
          aria-labelledby="giving-chart-title giving-chart-desc"
        >
          <title id="giving-chart-title">Where gifts go</title>
          <desc id="giving-chart-desc">
            {foundations
              .map((item) => `${item.percent}% to ${item.name}`)
              .join(". ")}
          </desc>
          <defs>
            <clipPath id="giving-cookie-clip">
              <circle cx={CX} cy={CY} r={R_OUT} />
            </clipPath>
          </defs>
          <g clipPath="url(#giving-cookie-clip)">
            <circle cx={CX} cy={CY} r={R_OUT} fill={DOUGH} />
            <circle cx="76" cy="100" r="72" fill={INK} opacity="0.1" />
          </g>
          {slices.map((slice) => (
            <a
              key={slice.name}
              href={slice.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${slice.name}, ${slice.percent} percent`}
            >
              <path d={slice.d} fill={slice.color} />
            </a>
          ))}
          <circle
            cx={CX}
            cy={CY}
            r={R_IN}
            fill={DOUGH_CENTER}
            stroke={INK}
            strokeWidth="3.2"
          />
          {chips.map((chip) => (
            <Chip key={`${chip.a}-${chip.r}`} {...chip} />
          ))}
          <circle
            cx={CX}
            cy={CY}
            r={R_OUT}
            fill="none"
            stroke={INK}
            strokeWidth="5.5"
          />
        </svg>
        <p className="giving-center">
          <span className="giving-pct">{majority.percent}%</span>
          <span className="giving-center-label">{majority.name}</span>
        </p>
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
              <span className="giving-share">{foundation.percent}%</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
