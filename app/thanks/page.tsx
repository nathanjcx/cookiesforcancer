import Link from "next/link";
import { CookieMark } from "@/components/CookieMark";

export default function ThanksPage() {
  return (
    <main className="thanks">
      <div className="thanks-card">
        <CookieMark size={56} />
        <h1>Thank you.</h1>
        <p>Your donation is in.</p>
        <Link href="/">Back</Link>
      </div>
    </main>
  );
}
