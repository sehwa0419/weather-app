import { CITIES } from "@/data/cities";
import { getWeather } from "@/services/weather";
import { getWeatherInfo } from "@/utils/weatherCode";
import RefreshButton from "@/components/RefreshButton";
import CityList from "@/components/CityList";

type HomePageProps = {
  searchParams: Promise<{
    refresh?: string;
  }>;
};

export default async function Home({
  searchParams,
}: HomePageProps) {
  const { refresh } = await searchParams;
  const forceRefresh = Boolean(refresh);

  const citiesWithWeather = await Promise.all(
    CITIES.map(async (city) => {
      const weatherData = await getWeather(
        city.lat,
        city.lon,
        forceRefresh
      );

      const weatherInfo = getWeatherInfo(
        weatherData.current.weather_code
      );

      return {
        ...city,
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        weather: weatherInfo.text,
        icon: weatherInfo.icon,
        time: weatherData.current.time,
      };
    })
  );

  const weatherTime = citiesWithWeather[0]?.time;

  const updatedTime = weatherTime
  ? weatherTime.replace("T", " ")
  : "-";

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              실시간 도시 날씨
            </h1>

            <p className="mt-3 text-slate-600">
              도시를 선택해 현재 날씨와 주간 예보를 확인할 수 있어요.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm">
            <div>
              <p className="text-xs text-slate-400">날씨 기준</p>

              <p className="whitespace-nowrap text-sm font-semibold text-slate-700">
                {updatedTime}
              </p>
            </div>

            <RefreshButton />
          </div>
        </header>
        <CityList cities={citiesWithWeather} />
      </div>
    </main>
  );
}