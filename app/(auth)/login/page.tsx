import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-6 py-16">
      <div className="space-y-2">
        <p className="text-sm font-medium text-zinc-500">Rimvio</p>
        <h1 className="text-2xl font-semibold tracking-tight">로그인</h1>
        <p className="text-[14px] leading-relaxed text-zinc-600">
          Supabase Auth를 연결하면 이 화면에서 세션을 엽니다. 지금은 Hub
          골격만 준비되어 있습니다.
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-[13px] text-zinc-500">
          NEXT_PUBLIC_SUPABASE_URL / ANON_KEY를 설정한 뒤 Auth UI를 붙이세요.
        </p>
      </div>
      <Link
        href="/"
        className="text-sm font-medium text-zinc-900 underline-offset-2 hover:underline"
      >
        Hub로 돌아가기
      </Link>
    </main>
  );
}
