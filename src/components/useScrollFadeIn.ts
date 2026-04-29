import { useEffect, useRef, useState } from 'react';

export function useScrollFadeIn<T extends HTMLElement>(direction: 'up' | 'down' = 'up', duration = 0.7, delay = 0) {
  const dom = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = dom.current;
    if (!element) return;

    // Fallback: ensure content is visible even if observer is unavailable.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const hiddenTransform = direction === 'up' ? 'translateY(40px)' : 'translateY(-40px)';

  return {
    ref: dom,
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : hiddenTransform,
      transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
      willChange: 'opacity, transform',
    },
  };
}
