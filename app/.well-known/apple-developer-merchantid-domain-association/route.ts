export const runtime = "nodejs";

const SOURCES = [
  "https://stripe.com/files/apple-pay/apple-developer-merchantid-domain-association",
  "https://js.stripe.com/v3/apple-pay/apple-developer-merchantid-domain-association",
];

export async function GET() {
  for (const url of SOURCES) {
    try {
      const response = await fetch(url, { cache: "force-cache" });
      if (!response.ok) continue;
      return new Response(await response.text(), {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      /* try the next source */
    }
  }

  return new Response("Apple Pay domain file unavailable.", { status: 404 });
}
