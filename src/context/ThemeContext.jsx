import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // LocalStorage check karega ki user ne pehle kaunsa theme set kiya tha
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('shopzone_theme') === 'dark';
  });

  // Jab bhi isDarkMode change hoga, body mein ek class lag jayegi
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('shopzone_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('shopzone_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}