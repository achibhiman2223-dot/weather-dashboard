import { useEffect, useMemo, useState } from 'react';
import { fetchWeather } from './services/weather';
import type { WeatherData } from './types';

const defaultCity = 'London';

function App() {
  const [cityInput, setCityInput] = useState(defaultCity);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadWeather = async (city: string) => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchWeather(city);
      setWeather(data);
      setCityInput(data.city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong while fetching weather data.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadWeather(defaultCity);
  }, []);

  const formattedCurrentTime = useMemo(() => {
    if (!weather?.current.time) return 'Now';
    return new Date(weather.current.time).toLocaleString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  }, [weather]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedCity = cityInput.trim();

    if (!trimmedCity) {
      setError('Please enter a city name.');
      return;
    }

    void loadWeather(trimmedCity);
  };

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="topbar">
          <div>
            <p className="eyebrow">Weather Overview</p>
            <h1>Weather Dashboard</h1>
          </div>

          <form className="search-bar" onSubmit={handleSubmit}>
            <input
              aria-label="Search city"
              type="text"
              value={cityInput}
              onChange={(event) => setCityInput(event.target.value)}
              placeholder="Search city"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Search'}
            </button>
          </form>
        </header>

        {error && <div className="alert error">{error}</div>}

        {!loading && weather && (
          <>
            <section className="hero-card">
              <div className="hero-copy">
                <p className="location-text">
                  {weather.city}, {weather.country}
                </p>
                <h2>{Math.round(weather.current.temp)}°C</h2>
                <p className="condition-text">{weather.current.condition}</p>
                <p className="updated-text">Updated {formattedCurrentTime}</p>
              </div>

              <div className="hero-metrics">
                <div className="metric-pill">
                  <span>Feels like</span>
                  <strong>{Math.round(weather.current.feelsLike)}°C</strong>
                </div>
                <div className="metric-pill">
                  <span>Humidity</span>
                  <strong>{weather.current.humidity}%</strong>
                </div>
                <div className="metric-pill">
                  <span>Wind</span>
                  <strong>{Math.round(weather.current.wind)} km/h</strong>
                </div>
              </div>
            </section>

            <section className="metrics-grid">
              <div className="stat-card">
                <span>Precipitation</span>
                <strong>{weather.current.precipitation} mm</strong>
              </div>
              <div className="stat-card">
                <span>Condition</span>
                <strong>{weather.current.condition}</strong>
              </div>
              <div className="stat-card">
                <span>Min/Max</span>
                <strong>
                  {Math.round(weather.daily[0].minTemp)}° / {Math.round(weather.daily[0].maxTemp)}°
                </strong>
              </div>
              <div className="stat-card">
                <span>Rain chance</span>
                <strong>{weather.daily[0].precipitationChance}%</strong>
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <h3>Next 8 hours</h3>
              </div>
              <div className="hourly-grid">
                {weather.hourly.map((hour) => (
                  <div key={hour.time} className="hour-card">
                    <span>{new Date(hour.time).toLocaleTimeString([], { hour: 'numeric' })}</span>
                    <strong>{Math.round(hour.temp)}°C</strong>
                    <small>{hour.condition}</small>
                    <em>{hour.precipitationChance}% rain</em>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="panel-header">
                <h3>7-day forecast</h3>
              </div>
              <div className="daily-list">
                {weather.daily.map((day) => (
                  <div key={day.date} className="daily-row">
                    <div className="daily-day">
                      <strong>{new Date(day.date).toLocaleDateString([], { weekday: 'short' })}</strong>
                      <span>{day.condition}</span>
                    </div>
                    <div className="daily-temp">
                      <span>{Math.round(day.maxTemp)}°</span>
                      <small>{Math.round(day.minTemp)}°</small>
                    </div>
                    <div className="daily-rain">{day.precipitationChance}%</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {loading && !weather && (
          <div className="loading-state">
            <div className="spinner" aria-label="Loading weather" />
            <p>Loading weather data...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
