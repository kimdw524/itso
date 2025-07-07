'use client';

import { useContext, useLayoutEffect, useRef, type ComponentProps, type CSSProperties, type ElementType } from 'react';

import { TransitionGroupContext } from '#components/TransitionGroup';

type AnimationStyle = string | CSSProperties;

const setStyle = <T extends HTMLElement>(element: T, style: AnimationStyle) => {
  if (typeof style === 'string') {
    element.classList.add(style);
    return;
  }

  Object.assign(element.style, style);
};

const removeStyle = <T extends HTMLElement>(element: T, style: AnimationStyle) => {
  if (typeof style === 'string') {
    element.classList.remove(style);
    return;
  }

  for (const key in style) {
    element.style.removeProperty(key);
  }
};

const forceReflow = <T extends HTMLElement>(element: T) => {
  // eslint-disable-next-line
  element.offsetTop;
};

type CSSTransitionProps<T extends ElementType> = {
  as?: T;
  initial: AnimationStyle;
  animate: AnimationStyle;
  exit: AnimationStyle;
  duration: number;
} & Omit<ComponentProps<T>, 'as'>;

export const CSSTransition = <T extends ElementType>({
  children,
  as,
  initial,
  animate,
  exit,
  duration,
  style,
  ...props
}: CSSTransitionProps<T>) => {
  const Component = as || 'div';
  const elementRef = useRef<HTMLDivElement>(null);
  const context = useContext(TransitionGroupContext);

  if (context === undefined) {
    throw new Error('CSSTransition must be used within an AnimationPresence');
  }

  const { isUnmounted, key, requestUnmount } = context;

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    element.style.transition = `all ${duration}ms ease`;

    forceReflow(element);
    setStyle(element, initial);
    forceReflow(element);

    removeStyle(element, initial);
    setStyle(element, animate);

    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!isUnmounted || !element) {
      return;
    }

    const handleTransitionEnd = (e: TransitionEvent) => {
      const element = elementRef.current;
      if (!element || e.target !== element) {
        return;
      }

      requestUnmount(key);
    };

    element.addEventListener('transitionend', handleTransitionEnd);

    removeStyle(element, initial);
    removeStyle(element, animate);
    setStyle(element, exit);

    return () => {
      element.removeEventListener('transitionend', handleTransitionEnd);
    };
    // eslint-disable-next-line
  }, [isUnmounted, key, requestUnmount]);

  return (
    <Component ref={elementRef} style={{ ...(initial as CSSProperties), ...style }} {...props}>
      {children}
    </Component>
  );
};
