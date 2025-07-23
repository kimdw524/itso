'use client';

import { useEffect } from 'react';

/**
 * 마우스를 사용하는 환경에서도 드래그로 가로 스크롤을 할 수 있게 만드는 hook
 */
export const useMouseScroll = <T extends React.RefObject<HTMLElement | null>>(
  ref: T,
): void => {
  useEffect(() => {
    const element = ref.current;
    let isDown = false,
      startX = 0,
      startLeft = 0;

    if (element === null) {
      return;
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!element.contains(e.target as Node)) {
        return;
      }

      isDown = true;

      startLeft = element.scrollLeft;
      startX = e.x;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) {
        return;
      }

      element.scrollLeft = startLeft + startX - e.x;
    };

    const handleMouseUp = (e: MouseEvent) => {
      isDown = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref]);
};
