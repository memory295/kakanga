import { useEffect, useRef, useState } from 'react';

type Options = IntersectionObserverInit & { once?: boolean };

export function useInView<T extends HTMLElement = HTMLElement>(options: Options = { threshold: 0.2, once: true }) {
  const { once = true, ...observerOptions } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current as Element | null;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, observerOptions);

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, observerOptions.root, observerOptions.rootMargin, observerOptions.threshold]);

  return { ref, inView } as const;
}
