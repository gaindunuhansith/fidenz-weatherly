import { useAuth0 } from '@auth0/auth0-react';

export default function Login({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
        aria-label="Toggle dark mode"
      >
        <span className="text-2xl">{darkMode ? '🌞' : '🌙'}</span>
      </button>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200 dark:border-gray-700 transition-colors">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">Weatherly</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Your personal weather companion</p>
        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
