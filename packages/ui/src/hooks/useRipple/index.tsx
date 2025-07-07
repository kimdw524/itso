'use client';

import { useEffect, useMemo, useRef } from 'react';

import * as s from './ripple.css';

export const useRipple = <T extends HTMLElement>(ref?: React.Ref<T>) => {
  const elementRef = useRef<T>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      ref(elementRef.current);
    } else {
      elementRef.current = ref.current;
    }

    const element = elementRef.current;
    const ripple = rippleRef.current;

    let isFadeIn = false,
      isMouseDown = false,
      isTransitionEnd = true;

    if (!ripple || !element) {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || !ripple || !isTransitionEnd) {
        return;
      }

      const x = e.offsetX,
        y = e.offsetY;

      const width = element.clientWidth / 2 + Math.abs(element.clientWidth / 2 - x),
        height = element.clientHeight / 2 + Math.abs(element.clientHeight / 2 - y);
      const size = Math.round(Math.sqrt(width ** 2 + height ** 2) * 2);

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      ripple.style.boxShadow = `${s.colorVar} 0 0 ${size / 10}px ${size / 10}px`;
      ripple.className = s.ripple({ animation: false });
      //eslint-disable-next-line
      ripple.offsetTop;
      ripple.className = s.ripple({ animation: true });
      ripple.style.opacity = '1';

      isFadeIn = true;
      isMouseDown = true;
      isTransitionEnd = false;
    };

    const handlePointerUp = () => {
      if (!isMouseDown) {
        return;
      }

      if (!isFadeIn) {
        ripple.style.opacity = '0';
        isFadeIn = false;
      }

      isMouseDown = false;
    };

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'opacity' && isFadeIn) {
        if (!isMouseDown) {
          ripple.style.opacity = '0';
        }

        isFadeIn = false;
        return;
      }

      if (e.propertyName === 'transform' && !isFadeIn) {
        isTransitionEnd = true;
      }
    };

    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointerleave', handlePointerUp);
    ripple.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointerleave', handlePointerUp);
      ripple.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [ref, rippleRef]);

  return useMemo(
    () => ({
      ripple: <div ref={rippleRef} className={s.ripple({ animation: false })} />,
    }),
    [rippleRef],
  );
};
