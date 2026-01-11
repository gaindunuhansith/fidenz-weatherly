import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import WeatherGrid from './components/WeatherGrid';

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <WeatherGrid darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  ) : (
    <Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
  );
}

export default App;
