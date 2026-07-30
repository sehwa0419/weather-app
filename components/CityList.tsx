"use client";

import { useMemo, useState } from "react";

import CityCard from "@/components/CityCard";

type CityWeather = {
  id: string;
  name: string;
  temperature: number;
  humidity: number;
  weather: string;
  icon: string;
};

type CityListProps = {
  cities: CityWeather[];
};

const FAVORITES_KEY = "favoriteCities";

export default function CityList({ cities }: CityListProps) {
  const [favoriteCities, setFavoriteCities] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return JSON.parse(
      localStorage.getItem(FAVORITES_KEY) ?? "[]"
    ) as string[];
  });

  // 관심 도시 저장 또는 해제
  const toggleFavorite = (cityId: string) => {
    setFavoriteCities((currentFavorites) => {
      const isFavorite = currentFavorites.includes(cityId);

      const nextFavorites = isFavorite
        ? currentFavorites.filter((id) => id !== cityId)
        : [...currentFavorites, cityId];

      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(nextFavorites)
      );

      return nextFavorites;
    });
  };

  // 관심 도시는 앞으로, 나머지는 기존 순서 유지
  const sortedCities = useMemo(() => {
    return [...cities].sort((cityA, cityB) => {
      const cityAIndex = favoriteCities.indexOf(cityA.id);
      const cityBIndex = favoriteCities.indexOf(cityB.id);

      const cityAIsFavorite = cityAIndex !== -1;
      const cityBIsFavorite = cityBIndex !== -1;

      if (cityAIsFavorite && cityBIsFavorite) {
        return cityAIndex - cityBIndex;
      }

      if (cityAIsFavorite) {
        return -1;
      }

      if (cityBIsFavorite) {
        return 1;
      }

      return 0;
    });
  }, [cities, favoriteCities]);

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sortedCities.map((city) => (
        <CityCard
          key={city.id}
          id={city.id}
          name={city.name}
          temperature={city.temperature}
          humidity={city.humidity}
          weather={city.weather}
          icon={city.icon}
          isFavorite={favoriteCities.includes(city.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </section>
  );
}