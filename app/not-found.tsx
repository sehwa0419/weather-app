import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <section className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sky-50">
          <span className="text-6xl" aria-hidden="true">
            ☁️
          </span>
        </div>

        <p className="mt-8 text-sm font-semibold tracking-widest text-sky-600">
          WEATHER NOT FOUND
        </p>

        <h1 className="mt-3 text-6xl font-bold text-slate-900">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          도시를 찾을 수 없어요
        </h2>

        <p className="mt-3 leading-7 text-slate-500">
          요청하신 도시가 목록에 없거나
          <br />
          주소가 잘못 입력된 것 같아요.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md"
        >
          ← 도시 목록으로 돌아가기
        </Link>
      </section>
    </main>
  );
}