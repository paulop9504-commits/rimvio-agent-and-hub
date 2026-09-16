import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/server/supabase";
import { listOwnLoops } from "@/lib/server/loops";

export default async function HubPage() {
  const configured = isSupabaseConfigured();
  const loops = configured ? await listOwnLoops().catch(() => []) : [];

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
      <header className="space-y-2">
        <p className="text-sm font-medium tracking-wide text-zinc-500">Rimvio</p>
        <h1 className="text-3xl font-semibold tracking-tight">Hub</h1>
        <p className="text-[15px] leading-relaxed text-zinc-600">
          Loop를 열고 Capability로 실행합니다. Agent는 여기서 준비된 Action만
          돌립니다.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-zinc-800">상태</h2>
          <Link
            href="/api/health"
            className="text-sm text-zinc-500 underline-offset-2 hover:underline"
          >
            /api/health
          </Link>
        </div>
        <p className="mt-3 text-[14px] text-zinc-600">
          Supabase:{" "}
          {configured ? (
            <span className="font-medium text-emerald-700">연결 준비됨</span>
          ) : (
            <span className="font-medium text-amber-700">
              .env.local 키를 넣어 주세요
            </span>
          )}
        </p>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-800">Loops</h2>
          <Link
            href="/login"
            className="text-sm font-medium text-zinc-900 underline-offset-2 hover:underline"
          >
            로그인
          </Link>
        </div>
        {loops.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-white/60 px-4 py-8 text-center text-[14px] text-zinc-500">
            아직 Loop가 없습니다. 마이그레이션을 적용하고 로그인하면 여기에
            보입니다.
          </p>
        ) : (
          <ul className="space-y-2">
            {loops.map((loop) => (
              <li
                key={loop.id}
                className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
              >
                <p className="font-medium tracking-tight">{loop.title}</p>
                <p className="mt-1 text-xs text-zinc-500">{loop.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
