import type { DailyForecast, HourlyForecast, WeatherData } from '../types';

export const WEATHER_CODES: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Freezing drizzle',
  57: 'Heavy freezing drizzle',
  61: 'Light rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Light snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Heavy rain showers',
  82: 'Violent rain showers',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Severe thunderstorm',
};

export function getWeatherLabel(code: number): string {
  return WEATHER_CODES[code] ?? 'Weather update';
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
  );

  if (!geoResponse.ok) {
    throw new Error('Unable to look up the city right now. Please try again.');
  }

  const geoData = await geoResponse.json();
  const location = geoData.results?.[0];

  if (!location) {
    throw new Error(`No matching city found for "${city}".`);
  }

  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,precipitation',
    hourly: 'temperature_2m,weather_code,precipitation_probability',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '7',
  });

  const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

  if (!weatherResponse.ok) {
    throw new Error('The weather API is currently unavailable. Please try again later.');
  }

  const weather = await weatherResponse.json();

  const daily: DailyForecast[] = weather.daily.time.map((date: string, index: number) => ({
    date,
    maxTemp: weather.daily.temperature_2m_max[index],
    minTemp: weather.daily.temperature_2m_min[index],
    condition: getWeatherLabel(weather.daily.weather_code[index]),
    precipitationChance: weather.daily.precipitation_probability_max[index] ?? 0,
  }));

  const hourly: HourlyForecast[] = weather.hourly.time.slice(0, 8).map((time: string, index: number) => ({
    time,
    temp: weather.hourly.temperature_2m[index],
    condition: getWeatherLabel(weather.hourly.weather_code[index]),
    precipitationChance: weather.hourly.precipitation_probability[index] ?? 0,
  }));

  return {
    city: location.name,
    country: location.country ?? 'Unknown',
    current: {
      time: weather.current.time,
      temp: weather.current.temperature_2m,
      feelsLike: weather.current.apparent_temperature,
      humidity: weather.current.relative_humidity_2m,
      wind: weather.current.wind_speed_10m,
      precipitation: weather.current.precipitation,
      condition: getWeatherLabel(weather.current.weather_code),
    },
    daily,
    hourly,
  };
}
