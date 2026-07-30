"use client";

import Link from "next/link";
import { Star } from "lucide-react";

type CityCardProps = {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  weather: string;
  icon: string;
  isFavorite: boolean;
  onToggleFavorite: (cityId: string) => void;
};

export default function CityCard({
  id,
  name,
  temperature,
  humidity,
  weather,
  icon,
  isFavorite,
  onToggleFavorite,
}: CityCardProps) {
  return (
    <article
      className={`h-full min-h-52 rounded-3xl bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
        isFavorite ? "ring-1 ring-amber-200" : ""
      }`}
    >
      {/* 도시명 + 저장 버튼 */}
      <div className="flex items-center justify-between">
        <Link href={`/city/${id}`}>
          <h2 className="text-xl font-semibold text-slate-900 transition hover:text-sky-600">
            {name}
          </h2>
        </Link>

        <button
          type="button"
          onClick={() => onToggleFavorite(id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `${name} 관심 도시에서 삭제`
              : `${name} 관심 도시로 저장`
          }
          title={
            isFavorite
              ? "관심 도시에서 삭제"
              : "관심 도시로 저장"
          }
          className="rounded-full p-2 transition hover:scale-110 hover:bg-amber-50"
        >
          <Star
            size={21}
            className={
              isFavorite
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300 transition hover:text-amber-400"
            }
          />
        </button>
      </div>

      <Link href={`/city/${id}`} className="block">
        {/* 온도 + 날씨 아이콘 */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-4xl font-bold text-slate-900">
            {temperature}℃
          </p>

          <span className="text-5xl" aria-label={weather}>
            {icon}
          </span>
        </div>

        {/* 날씨 상태 + 습도 */}
        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <span>{weather}</span>
          <span>💧 습도 {humidity}%</span>
        </div>
      </Link>
    </article>
  );
}