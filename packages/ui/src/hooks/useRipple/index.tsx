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

    let timer: ReturnType<typeof setTimeout>;
    let isAnimationPending = false;

    let isFadeIn = false,
      isMouseDown = false,
      isTransitionEnd = true;

    if (!ripple || !element) {
      return;
    }

    const clearTimer = () => {
      clearTimeout(timer);
      isAnimationPending = false;
    };

    const runAnimation = (x: number, y: number) => {
      const width =
          element.clientWidth / 2 + Math.abs(element.clientWidth / 2 - x),
        height =
          element.clientHeight / 2 + Math.abs(element.clientHeight / 2 - y);
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

      isAnimationPending = false;
      isFadeIn = true;
      isTransitionEnd = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!isAnimationPending) {
        return;
      }

      clearTimer();
      runAnimation(e.offsetX, e.offsetY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || !ripple || !isTransitionEnd) {
        return;
      }

      isMouseDown = true;

      if (e.pointerType === 'mouse') {
        runAnimation(e.offsetX, e.offsetY);
        return;
      }

      clearTimer();
      isAnimationPending = true;
      timer = setTimeout(() => runAnimation(e.offsetX, e.offsetY), 100);
    };

    const handlePointerUp = () => {
      if (!isMouseDown) {
        return;
      }

      clearTimer();

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

    element.addEventListener('click', handleClick);
    element.addEventListener('pointerdown', handlePointerDown);
    element.addEventListener('pointerup', handlePointerUp);
    element.addEventListener('pointerleave', handlePointerUp);
    ripple.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      element.removeEventListener('click', handleClick);
      element.removeEventListener('pointerdown', handlePointerDown);
      element.removeEventListener('pointerup', handlePointerUp);
      element.removeEventListener('pointerleave', handlePointerUp);
      ripple.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [ref, rippleRef]);

  return useMemo(
    () => ({
      ripple: (
        <div ref={rippleRef} className={s.ripple({ animation: false })} />
      ),
    }),
    [rippleRef],
  );
};
