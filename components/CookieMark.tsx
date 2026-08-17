export function CookieMark({ size = 40 }: { size?: number }) {
  return (
    <img
      className="cookie-mark"
      src="/cookie.png"
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
    />
  );
}
