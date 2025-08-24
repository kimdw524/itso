import { useEffect, useState } from 'react';

export const useSticky = <T extends HTMLElement>(
  targetRef: React.RefObject<T | null>,
) => {
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const target = targetRef.current;

    if (target === null) {
      return;
    }

    const createIntersectionObserver = (top: number) => {
      return new IntersectionObserver(
        ([entry]) => {
          setIsStuck(!entry?.isIntersecting);
        },
        {
          rootMargin: `${-top - 1}px 0px 0px 0px`,
          threshold: 1,
        },
      );
    };

    const top = parseInt(getComputedStyle(target).top);
    let observer = createIntersectionObserver(top);
    observer.observe(target);

    const handleTransitionStart = (e: TransitionEvent) => {
      if (e.propertyName !== 'top') {
        return;
      }

      observer.disconnect();
      const top = parseInt(getComputedStyle(target).top);
      observer = createIntersectionObserver(top);
      observer.observe(target);
    };

    target.addEventListener('transitionstart', handleTransitionStart);

    return () => {
      observer.disconnect();
      target.removeEventListener('transitionstart', handleTransitionStart);
    };
  }, [targetRef]);

  return { isStuck };
};
