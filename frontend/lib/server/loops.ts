import { createSupabaseServerClient } from "@/lib/server/supabase";
import type { Loop } from "@/lib/types/domain";

/** List loops for the signed-in user. Empty when unauthenticated or DB missing. */
export async function listOwnLoops(): Promise<Loop[]> {
  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return [];
  }
  const { data, error } = await supabase
    .from("loops")
    .select(
      "id, owner_id, title, goal, status, created_at, updated_at",
    )
    .eq("owner_id", auth.user.id)
    .order("updated_at", { ascending: false });
  if (error || !data) {
    return [];
  }
  return data as Loop[];
}
