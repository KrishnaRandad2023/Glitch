import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightTheme = {
    background: '#f8f9fa',
    cardBackground: '#ffffff',
    textPrimary: '#1a1a1a',
    textSecondary: '#6c757d',
    textTertiary: '#adb5bd',
    primary: '#7444C0',
    border: '#e9ecef',
    shadow: 'rgba(0,0,0,0.1)',
    headerBackground: '#ffffff',
  };

  const darkTheme = {
    background: '#0d1117',
    cardBackground: '#21262d',
    textPrimary: '#f0f6fc',
    textSecondary: '#8b949e',
    textTertiary: '#6e7681',
    primary: '#9d4edd',
    border: '#30363d',
    shadow: 'rgba(0,0,0,0.4)',
    headerBackground: '#161b22',
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
