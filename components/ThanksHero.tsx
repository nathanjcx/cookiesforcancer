export function ThanksHero() {
  return (
    <div className="thanks-hero" aria-hidden="true">
      <svg
        className="thanks-hero-svg"
        viewBox="0 0 200 176"
        width="160"
        height="141"
      >
        <defs>
          <radialGradient id="thanks-glow" cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#e8c48a" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#f0d9b5" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#f6eee0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="thanks-cookie" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#efd3a8" />
            <stop offset="55%" stopColor="#d4a06a" />
            <stop offset="100%" stopColor="#b87a42" />
          </radialGradient>
        </defs>

        <ellipse
          className="thanks-glow"
          cx="100"
          cy="96"
          rx="78"
          ry="62"
          fill="url(#thanks-glow)"
        />

        <g className="thanks-cookie">
          <path
            d="M100 42c22.5 0 42 10.6 51.8 27.4 8.2 14.1 8.4 32.2 1.2 47.2-7.8 16.3-24.6 28.2-44.8 31.2-18.4 2.7-38-2.4-50.6-15.6C45.2 119.6 40 103.4 42.4 87.6 45.2 69.2 68.4 42 100 42Z"
            fill="url(#thanks-cookie)"
            stroke="#6b3e22"
            strokeWidth="1.4"
          />
          <path
            d="M78 58c8-4 18-6 28-4"
            fill="none"
            stroke="#f6e4c4"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.55"
          />
          <circle cx="74" cy="84" r="6.2" fill="#3d2314" />
          <circle cx="108" cy="72" r="5.1" fill="#2a1a12" />
          <circle cx="128" cy="98" r="6.6" fill="#3d2314" />
          <circle cx="92" cy="112" r="4.8" fill="#2a1a12" />
          <circle cx="62" cy="108" r="4.2" fill="#4a2b18" />
          <circle cx="118" cy="122" r="3.6" fill="#3d2314" />
          <circle cx="86" cy="70" r="3.2" fill="#4a2b18" />
        </g>

        <g className="thanks-heart">
          <path
            d="M100 58c-1.4-8.6-10.8-14.2-18.4-10.6-5.6 2.6-8.2 8.8-6.8 14.8 1.8 7.8 9.6 12.8 25.2 22.6 15.6-9.8 23.4-14.8 25.2-22.6 1.4-6-1.2-12.2-6.8-14.8C110.8 43.8 101.4 49.4 100 58Z"
            fill="#c45c4a"
          />
        </g>

        <g className="thanks-sparkle thanks-sparkle-a">
          <circle cx="46" cy="58" r="2.4" fill="#c45c4a" />
        </g>
        <g className="thanks-sparkle thanks-sparkle-b">
          <circle cx="156" cy="72" r="2" fill="#b87a42" />
        </g>
        <g className="thanks-sparkle thanks-sparkle-c">
          <circle cx="160" cy="118" r="1.7" fill="#c45c4a" />
        </g>
      </svg>
    </div>
  );
}
