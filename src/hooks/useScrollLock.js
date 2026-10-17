import { useEffect } from 'react';

export function useScrollLock(locked) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('is-locked', Boolean(locked));
    return () => root.classList.remove('is-locked');
  }, [locked]);
}
