import { createBrowserClient } from "@supabase/ssr";

/** Browser Supabase client — auth/UI only. Domain writes go through /api. */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) {
    throw new Error("Supabase browser env is not configured");
  }
  return createBrowserClient(url, key);
}
