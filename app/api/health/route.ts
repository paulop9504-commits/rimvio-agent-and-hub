import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/server/supabase";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "rimvio-agent-and-hub",
    supabaseConfigured: isSupabaseConfigured(),
    now: new Date().toISOString(),
  });
}
