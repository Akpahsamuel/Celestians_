import { useTheme } from '../context/ThemeContext';

export function ThemeDebug() {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <p className="text-black dark:text-white">
        Dark Mode: {isDarkMode ? 'On' : 'Off'}
      </p>
    </div>
  );
} 