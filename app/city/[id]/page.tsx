import Link from "next/link";
import { notFound } from "next/navigation";

import { CITIES } from "@/data/cities";
import { getWeather } from "@/services/weather";
import { getWeatherInfo } from "@/utils/weatherCode";
import { ArrowLeft } from "lucide-react";

type CityDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function CityDetailPage({
    params,
}: CityDetailPageProps) {
    const { id } = await params;

    const city = CITIES.find((item) => item.id === id);

    if (!city) {
        notFound();
    }

    const weatherData = await getWeather(city.lat, city.lon);
    const currentWeather = getWeatherInfo(
        weatherData.current.weather_code
    );
    const dailyHumidity = weatherData.daily.time.map((date) => {
        const humidityValues = weatherData.hourly.time
            .map((time, index) => ({
                time,
                humidity: weatherData.hourly.relative_humidity_2m[index],
            }))
            .filter((item) => item.time.startsWith(date))
            .map((item) => item.humidity);

        if (humidityValues.length === 0) {
            return null;
        }

        const total = humidityValues.reduce(
            (sum, humidity) => sum + humidity,
            0
        );

        return Math.round(total / humidityValues.length);
    });

    return (
        <main className="min-h-screen bg-slate-100 px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
                >
                    <ArrowLeft size={16} />
                    <span>모든 도시</span>
                </Link>

                <section className="rounded-3xl bg-white p-8 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                현재 날씨
                            </p>

                            <h1 className="mt-1 text-3xl font-bold text-slate-900">
                                {city.name}
                            </h1>

                            <p className="mt-3 text-5xl font-bold text-slate-900">
                                {weatherData.current.temperature_2m}℃
                            </p>
                        </div>

                        <div className="text-center">
                            <span
                                className="block text-7xl"
                                aria-label={currentWeather.text}
                            >
                                {currentWeather.icon}
                            </span>

                            <p className="mt-2 text-sm font-medium text-slate-600">
                                {currentWeather.text}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <p className="flex items-center gap-1 text-sm text-slate-600">
                            <span aria-hidden="true">💧</span>
                            <span>습도 {weatherData.current.relative_humidity_2m}%</span>
                        </p>

                        <div className="flex gap-5 text-sm">
                            <span className="font-semibold text-rose-500">
                                최고 {weatherData.daily.temperature_2m_max[0]}℃
                            </span>

                            <span className="font-semibold text-blue-500">
                                최저 {weatherData.daily.temperature_2m_min[0]}℃
                            </span>
                        </div>
                    </div>
                </section>

                <section className="mt-8">
                    <h2 className="mb-4 text-2xl font-bold text-slate-900">
                        주간 예보
                    </h2>

                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
                        {weatherData.daily.time.slice(0).map((date, index) => {
                            const dailyIndex = index;

                            const weather = getWeatherInfo(
                                weatherData.daily.weather_code[dailyIndex]
                            );

                            return (
                                <article
                                    key={date}
                                    className="flex items-center border-b border-slate-100 px-7 py-6 last:border-b-0"
                                >
                                    {/* 날짜 */}
                                    <div className="w-24 sm:w-40">
                                        {/* 모바일 */}
                                        <p className="font-semibold text-slate-900 sm:hidden">
                                            {new Date(`${date}T00:00:00`).toLocaleDateString("ko-KR", {
                                                day: "numeric",
                                                weekday: "short",
                                            })}
                                        </p>

                                        {/* 태블릿·PC */}
                                        <p className="hidden font-semibold text-slate-900 sm:block">
                                            {new Date(`${date}T00:00:00`).toLocaleDateString("ko-KR", {
                                                month: "long",
                                                day: "numeric",
                                                weekday: "short",
                                            })}
                                        </p>
                                    </div>

                                    {/* 날씨 아이콘 + 상태 */}
                                    <div className="flex w-20 items-center sm:w-48 sm:gap-3">
                                        <span
                                            className="w-10 shrink-0 text-center text-3xl"
                                            aria-label={weather.text}
                                        >
                                            {weather.icon}
                                        </span>

                                        <span className="hidden text-left text-sm text-slate-600 sm:inline">
                                            {weather.text}
                                        </span>
                                    </div>

                                    {/* 습도, 최고/최저 */}
                                    <div className="ml-auto flex items-center gap-3 text-sm">
                                        <span className="whitespace-nowrap text-sky-600">
                                            💧 {dailyHumidity[dailyIndex] ?? "-"}%
                                        </span>

                                        <span className="w-12 text-right whitespace-nowrap font-semibold text-rose-500">
                                            {weatherData.daily.temperature_2m_max[index]}℃
                                        </span>

                                        <span className="w-12 text-right whitespace-nowrap font-semibold text-blue-500">
                                            {weatherData.daily.temperature_2m_min[index]}℃
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}