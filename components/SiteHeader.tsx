import Link from "next/link";
import { CookieMark } from "@/components/CookieMark";

export function SiteHeader({ current }: { current?: "home" | "donate" }) {
  return (
    <header className="site-header">
      <a className="brand" href="/">
        <CookieMark size={28} />
        <span className="brand-name">Cookies for Cancer</span>
      </a>
      {current === "donate" ? (
        <span className="btn btn-accent" aria-current="page">
          Donate
        </span>
      ) : (
        <Link className="btn btn-accent" href="/donate">
          Donate
        </Link>
      )}
    </header>
  );
}
