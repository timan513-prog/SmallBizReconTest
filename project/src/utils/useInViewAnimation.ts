import { useEffect, useRef, useState } from 'react';

interface UseInViewAnimationOptions {
  delay?: number;
  threshold?: number;
}

export const useInViewAnimation = (options: UseInViewAnimationOptions = {}) => {
  const { delay = 0, threshold = 0.1 } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay before triggering animation
          setTimeout(() => {
            setIsInView(true);
          }, delay);
          // Unobserve after triggering to prevent re-triggering
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  return { ref, isInView };
};