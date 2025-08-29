import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme =
      (localStorage.getItem('pomodoro-theme') as AvailableThemes) || 'dark';
    return storageTheme;
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) {
    event.preventDefault();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  const nextThemeIcon: Record<AvailableThemes, React.ReactNode> = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pomodoro-theme', theme);
    return () => {};
  }, [theme]);
  return (
    <nav className={styles.menu}>
      <RouterLink
        href='/'
        className={styles.menuLink}
        aria-label='Ir para a home'
        title='Ir para a home'>
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href='/history'
        className={styles.menuLink}
        aria-label='Ver historico'
        title='Ver historico'>
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href='/settings'
        className={styles.menuLink}
        aria-label='Configurações'
        title='Configurações'>
        <SettingsIcon />
      </RouterLink>
      <a
        href='#'
        className={styles.menuLink}
        aria-label='Mudar tema'
        title='Mudar tema'
        onClick={handleThemeChange}>
        {nextThemeIcon[theme]}
      </a>
    </nav>
  );
}
