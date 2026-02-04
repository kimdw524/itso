'use client';

import {
  useLayoutEffect,
  useRef,
  type ComponentProps,
  type ReactElement,
} from 'react';

import clsx from 'clsx';

import { useCounter } from '@/shared/hooks/useCounter';

import * as s from './style.css';
import { useRollingText } from './useRollingText';

interface RollingTextProps extends ComponentProps<'div'> {
  children: ReactElement | ReactElement[];
  duration: number;
}

export const RollingText = ({
  children,
  duration,
  className,
  ...rest
}: RollingTextProps) => {
  const childArray = Array.isArray(children) ? children : [children];
  const childCount = childArray.length;

  const prevCountRef = useRef<number>(0);
  const nextRef = useRef<HTMLDivElement>(null),
    currentRef = useRef<HTMLDivElement>(null);
  const { count } = useCounter({ interval: 3000, max: childCount - 1 });
  const { roll } = useRollingText({
    current: currentRef,
    next: nextRef,
    duration,
  });

  useLayoutEffect(() => {
    if (count === prevCountRef.current) {
      return;
    }

    prevCountRef.current = count;
    roll();
  }, [count, roll]);

  return (
    <div className={clsx(s.container, className)} {...rest}>
      <div ref={currentRef} className={s.item}>
        {childArray[count]}
      </div>
      <div ref={nextRef} className={s.item}>
        {childArray[(count - 1 + childCount) % childCount]}
      </div>
    </div>
  );
};
