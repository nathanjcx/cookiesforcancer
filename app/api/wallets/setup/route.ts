import { NextRequest, NextResponse } from "next/server";
import { ensureWalletDomains } from "@/lib/stripe";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await ensureWalletDomains(request);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
