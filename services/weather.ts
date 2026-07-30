import type { WeatherResponse } from "@/types/weather";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(
  latitude: number,
  longitude: number,
  forceRefresh: boolean = false
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,weather_code",
    hourly: "relative_humidity_2m",
    daily: "temperature_2m_max,temperature_2m_min,weather_code",
    timezone: "Asia/Seoul",
    forecast_days: "7",
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`,
    forceRefresh
      ? {
          cache: "no-store",
        }
      : {
          next: {
            revalidate: 600,
          },
        }
  );

  if (!response.ok) {
    throw new Error("날씨 정보를 가져오지 못했습니다.");
  }

  return response.json();
}