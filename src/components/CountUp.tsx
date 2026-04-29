import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}


const CountUp = ({ end, duration = 2, suffix = '' }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let observer: IntersectionObserver;
    let interval: NodeJS.Timeout;

    const animate = () => {
      let start = 0;
      setHasAnimated(true);
      interval = setInterval(() => {
        start += end / (duration * 60);
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animate();
        } else if (!entry.isIntersecting) {
          setCount(0);
          setHasAnimated(false);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default CountUp;
