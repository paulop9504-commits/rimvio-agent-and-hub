import { NextResponse } from "next/server";
import { listOwnLoops } from "@/lib/server/loops";
import { isSupabaseConfigured } from "@/lib/server/supabase";

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "supabase_not_configured", loops: [] },
      { status: 503 },
    );
  }

  try {
    const loops = await listOwnLoops();
    return NextResponse.json({ loops });
  } catch (error) {
    const message = error instanceof Error ? error.message : "loops_failed";
    return NextResponse.json({ error: message, loops: [] }, { status: 500 });
  }
}
