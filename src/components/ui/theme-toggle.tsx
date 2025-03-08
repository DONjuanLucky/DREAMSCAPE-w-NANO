import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // This is just for demonstration - the app is always in dark mode
    // In a real app, we would toggle the 'dark' class on the document element
    const timer = setTimeout(() => {
      // Show a tooltip or notification that the app is always in dark mode
      const notification = document.createElement("div");
      notification.className =
        "fixed bottom-4 right-4 bg-gray-900 text-white p-3 rounded-lg shadow-lg z-50 animate-fade-in-out";
      notification.textContent =
        "Dreamscape is designed to be used in dark mode only.";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    }, 500);

    return () => clearTimeout(timer);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};

export default ThemeToggle;
