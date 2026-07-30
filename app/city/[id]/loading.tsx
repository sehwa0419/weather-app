export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-4xl animate-pulse">
        <div className="mb-6 h-5 w-28 rounded bg-slate-200" />

        <section className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex justify-between gap-6">
            <div>
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="mt-4 h-10 w-32 rounded bg-slate-200" />
              <div className="mt-6 h-14 w-40 rounded bg-slate-200" />
              <div className="mt-4 h-5 w-24 rounded bg-slate-200" />
            </div>

            <div className="h-24 w-24 rounded-full bg-slate-200" />
          </div>
        </section>

        <div className="mt-8 h-8 w-28 rounded bg-slate-200" />

        <section className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-40 rounded-2xl bg-white shadow-sm"
            />
          ))}
        </section>
      </div>
    </main>
  );
}