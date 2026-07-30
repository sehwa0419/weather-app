"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.replace(`/?refresh=${Date.now()}`, {
        scroll: false,
      });
    });
  };

  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={isPending}
      className="rounded-lg px-2 py-1 text-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-wait disabled:opacity-50"
      aria-label="날씨 새로고침"
      title="최신 날씨 불러오기"
    >
      {isPending ? "…" : "↻"}
    </button>
  );
}