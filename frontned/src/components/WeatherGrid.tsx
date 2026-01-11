import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface WeatherData {
  cityName: string;
  weatherDescription: string;
  temperature: number;
  comfortScore: number;
  rank?: number;
}

interface WeatherResult {
  data: WeatherData;
  cacheStatus: 'HIT' | 'MISS';
}

export default function WeatherGrid({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
  const { logout, user } = useAuth0();
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/v1/weather');
        
        const weatherData = response.data['weather data'].map((item: WeatherResult) => item.data);
        setWeather(weatherData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather data');
        console.error('Error fetching weather:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (description: string) => {
    const lower = description.toLowerCase();
    if (lower.includes('clear') || lower.includes('sun')) return '☀️';
    if (lower.includes('cloud')) return '☁️';
    if (lower.includes('rain') || lower.includes('drizzle')) return '🌧️';
    if (lower.includes('snow')) return '❄️';
    if (lower.includes('thunder') || lower.includes('storm')) return '⛈️';
    if (lower.includes('mist') || lower.includes('fog')) return '🌫️';
    return '🌤️';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Weatherly</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '🌙' : '🌞'}
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">{user?.name}</span>
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
            <p className="font-semibold">Error loading weather data</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weather.map((item) => (
              <div
                key={item.cityName}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{item.cityName}</h2>
                    {item.rank && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded">
                        Rank #{item.rank}
                      </span>
                    )}
                  </div>
                  <span className="text-4xl">{getWeatherIcon(item.weatherDescription)}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{item.temperature}°C</p>
                  <p className="text-gray-600 dark:text-gray-300">{item.weatherDescription}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Comfort Score:</span>
                    <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">{item.comfortScore}/100</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
