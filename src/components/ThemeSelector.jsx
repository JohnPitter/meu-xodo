import { useState, useEffect, useCallback } from 'react';
import './ThemeSelector.css';

export default function ThemeSelector() {
  const [theme, setTheme] = useState('dark');
  const [isOpen, setIsOpen] = useState(false);

  const applyTheme = useCallback((selectedTheme) => {
    let finalTheme = selectedTheme;

    if (selectedTheme === 'sistema') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      finalTheme = prefersDark ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', finalTheme);
  }, []);

  useEffect(() => {
    // Initialize theme from localStorage on mount
    const savedTheme = localStorage.getItem('meu-xodo-theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, [applyTheme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('meu-xodo-theme', newTheme);
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const getThemeLabel = () => {
    const labels = {
      light: '☀️ Claro',
      dark: '🌙 Escuro',
      sistema: '⚙️ Sistema'
    };
    return labels[theme];
  };

  return (
    <div className="theme-selector">
      <button
        className="theme-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Alterar tema"
      >
        {getThemeLabel()}
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <button
            className={`theme-option ${theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            ☀️ Claro
          </button>
          <button
            className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            🌙 Escuro
          </button>
          <button
            className={`theme-option ${theme === 'sistema' ? 'active' : ''}`}
            onClick={() => handleThemeChange('sistema')}
          >
            ⚙️ Sistema
          </button>
        </div>
      )}
    </div>
  );
}
