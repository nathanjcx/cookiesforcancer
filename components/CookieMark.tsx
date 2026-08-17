export function CookieMark({ size = 42 }: { size?: number }) {
  const shineId = `cookieShine-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" fill="#E0A86A" />
      <circle cx="32" cy="32" r="28" fill={`url(#${shineId})`} />
      <circle cx="20" cy="24" r="4.2" fill="#4A2C1A" />
      <circle cx="34" cy="18" r="3.2" fill="#3B2416" />
      <circle cx="44" cy="28" r="4.6" fill="#4A2C1A" />
      <circle cx="26" cy="38" r="3.6" fill="#3B2416" />
      <circle cx="41" cy="42" r="3.1" fill="#4A2C1A" />
      <circle cx="18" cy="44" r="2.4" fill="#3B2416" />
      <defs>
        <radialGradient id={shineId} cx="0" cy="0" r="1">
          <stop offset="0%" stopColor="#f3c48a" />
          <stop offset="70%" stopColor="#d4924e" />
          <stop offset="100%" stopColor="#c07d3b" />
        </radialGradient>
      </defs>
    </svg>
  );
}
