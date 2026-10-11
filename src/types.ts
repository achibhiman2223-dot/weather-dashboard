export type WeatherCodeKey = number;

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  precipitationChance: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  precipitationChance: number;
}

export interface CurrentWeather {
  time: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  precipitation: number;
  condition: string;
}

export interface WeatherData {
  city: string;
  country: string;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}
