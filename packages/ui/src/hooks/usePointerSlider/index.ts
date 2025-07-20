'use client';

import { useEffect, useState } from 'react';

export const usePointerSlider = <T extends React.RefObject<HTMLElement | null>>(
  ref: T,
  {
    min,
    max,
    defaultValue,
  }: {
    min: number;
    max: number;
    defaultValue: number;
  },
): number => {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    const element = ref.current;
    let isDown = false,
      parentWidth = 0,
      parentX = 0;

    if (element === null) {
      return;
    }

    element.style.left = `${((value - min) / (max - min)) * 100}%`;

    const handlePointerDown = (e: PointerEvent) => {
      element.setPointerCapture(e.pointerId);
      isDown = true;
      const boundingRect = element.parentElement?.getBoundingClientRect();

      if (boundingRect === undefined) {
        return;
      }

      parentWidth = boundingRect.width;
      parentX = boundingRect.x;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDown) {
        return;
      }

      const currentValue = Math.min(
        max,
        Math.max(min, Math.round((e.clientX - parentX) / (parentWidth / (max - min))) + min),
      );

      element.style.left = `${((currentValue - min) / (max - min)) * 100}%`;

      setValue(currentValue);
    };

    const handlePointerUp = (e: PointerEvent) => {
      element.releasePointerCapture(e.pointerId);
      isDown = false;
    };

    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointermove', handlePointerMove);
    element.addEventListener('pointerup', handlePointerUp);

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointermove', handlePointerMove);
      element.removeEventListener('pointerup', handlePointerUp);
    };
  }, [ref, max, min]);

  return value;
};
