import { NextResponse } from "next/server";
import { record, TYPES } from "@/lib/analytics-store";

export async function POST(req: Request) {
  try {
    const { type, id } = await req.json();
    if (!TYPES.includes(type) || typeof id !== "string" || !/^[\w .\-&+:/]{1,80}$/.test(id)) return NextResponse.json({ ok: false }, { status: 400 });
    await record(type, id);
  } catch { /* never fail the visitor */ }
  return NextResponse.json({ ok: true });
}
