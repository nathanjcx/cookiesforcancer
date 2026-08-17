import Link from "next/link";
import { CookieMark } from "@/components/CookieMark";

export default function ThanksPage() {
  return (
    <main className="thanks">
      <div className="thanks-card">
        <CookieMark size={64} />
        <h1>Thank you.</h1>
        <p>
          Your donation is in. That gift helps fund the fight — and it started
          with something as simple as showing up.
        </p>
        <Link href="/">Back to cookiesforcancer.org</Link>
      </div>
    </main>
  );
}
