import { useState, useEffect } from 'react';

export interface UseScrollDirectionOptions {
  hideThreshold?: number;
  showAtTopThreshold?: number;
  initialVisible?: boolean;
}

export interface UseScrollDirectionReturn {
  isVisible: boolean;
  scrollDirection: 'up' | 'down' | 'none';
  scrollY: number;
}

export function useScrollDirection(
  options: UseScrollDirectionOptions = {},
): UseScrollDirectionReturn {
  const {
    hideThreshold = 100,
    showAtTopThreshold = 10,
    initialVisible = true,
  } = options;

  const [isVisible, setIsVisible] = useState(initialVisible);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<
    'up' | 'down' | 'none'
  >('none');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      if (currentScrollY < showAtTopThreshold) {
        setIsVisible(true);
      } else if (
        currentScrollY > lastScrollY &&
        currentScrollY > hideThreshold
      ) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hideThreshold, showAtTopThreshold]);

  return {
    isVisible,
    scrollDirection,
    scrollY: lastScrollY,
  };
}
