import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const THEME_KEY = 'thunder-lab-theme';
type ThemeMode = 'dark' | 'light';
type ThemeToggleVariant = 'hero' | 'shell';

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function getInitialTheme(): ThemeMode {
  if (typeof document === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

interface ThemeToggleProps {
  className?: string;
  variant?: ThemeToggleVariant;
}

export default function ThemeToggle({ className = '', variant = 'shell' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === 'dark';
  const variantClassName = variant === 'hero' ? 'theme-toggle theme-toggle-hero' : 'theme-toggle theme-toggle-shell';

  return (
    <button type="button" aria-label={`切换至${isDark ? '浅色' : '深色'}模式`} aria-pressed={isDark} onClick={toggleTheme} className={`inline-flex h-10 w-10 items-center justify-center border backdrop-blur-sm transition-colors duration-300 ${variantClassName} ${className}`.trim()}>
      {isDark ? <Moon size={15} strokeWidth={1.8} /> : <Sun size={15} strokeWidth={1.8} />}
    </button>
  );
}
