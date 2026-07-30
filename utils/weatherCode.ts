type WeatherInfo = {
  text: string;
  icon: string;
};

const WEATHER: Record<number, WeatherInfo> = {
  0: { text: "맑음", icon: "☀️" },
  1: { text: "대체로 맑음", icon: "🌤️" },
  2: { text: "구름 조금", icon: "⛅" },
  3: { text: "흐림", icon: "☁️" },

  45: { text: "안개", icon: "🌫️" },
  48: { text: "짙은 안개", icon: "🌫️" },

  51: { text: "약한 이슬비", icon: "🌦️" },
  53: { text: "이슬비", icon: "🌦️" },
  55: { text: "강한 이슬비", icon: "🌧️" },

  61: { text: "약한 비", icon: "🌦️" },
  63: { text: "비", icon: "🌧️" },
  65: { text: "강한 비", icon: "⛈️" },

  71: { text: "약한 눈", icon: "🌨️" },
  73: { text: "눈", icon: "❄️" },
  75: { text: "강한 눈", icon: "❄️" },

  80: { text: "소나기", icon: "🌦️" },
  81: { text: "소나기", icon: "🌧️" },
  82: { text: "강한 소나기", icon: "⛈️" },

  95: { text: "천둥번개", icon: "⛈️" },
  96: { text: "우박 동반 뇌우", icon: "⛈️" },
  99: { text: "강한 우박 뇌우", icon: "⛈️" },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER[code] ?? {
    text: "정보 없음",
    icon: "❓",
  };
}