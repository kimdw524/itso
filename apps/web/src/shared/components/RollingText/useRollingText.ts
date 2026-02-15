import { useCallback, useLayoutEffect, type RefObject } from 'react';

interface UseRollingTextOptions {
  current: RefObject<HTMLDivElement | null>;
  next: RefObject<HTMLDivElement | null>;
  duration: number;
}

export const useRollingText = ({
  current,
  next,
  duration,
}: UseRollingTextOptions) => {
  const roll = useCallback(() => {
    const currentRef = current.current,
      nextRef = next.current;

    if (currentRef === null || nextRef === null) {
      return;
    }

    nextRef.animate(
      [
        { opacity: 1, transform: 'translateY(-50%)' },
        { opacity: 0, transform: 'translateY(-150%)' },
      ],
      {
        duration,
        easing: 'ease',
      },
    );

    currentRef.animate(
      [
        { opacity: 0, transform: 'translateY(50%)' },
        { opacity: 1, transform: 'translateY(-50%)' },
      ],
      {
        duration,
        easing: 'ease',
      },
    );
  }, [current, next, duration]);

  useLayoutEffect(() => {
    const nextRef = next.current;

    if (nextRef === null) {
      return;
    }

    nextRef.style.opacity = '0';
  }, [next]);

  return { roll };
};
