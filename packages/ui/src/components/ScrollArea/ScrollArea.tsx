'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { useMouseScroll } from '#hooks/useMouseScroll';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './ScrollArea.css';

type ScrollAreaProps = UIComponent<'div'>;

export const ScrollArea = ({
  children,
  className,
  sx: propSx,
  ...props
}: ScrollAreaProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [hasLeftSpace, setHasLeftSpace] = useState<boolean>(false);
  const [hasRightSpace, setHasRightSpace] = useState<boolean>(true);
  useMouseScroll(scrollAreaRef);

  useEffect(() => {
    const element = scrollAreaRef.current;

    if (element === null) {
      return;
    }

    const handleScroll = () => {
      setHasLeftSpace(element.scrollLeft !== 0);
      setHasRightSpace(
        element.scrollLeft + element.clientWidth < element.scrollWidth,
      );
    };

    handleScroll();

    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={scrollAreaRef}
      className={clsx(
        s.scrollArea,
        className,
        sx(propSx),
        hasLeftSpace && hasRightSpace && s.maskBoth,
        hasLeftSpace && s.maskLeft,
        hasRightSpace && s.maskRight,
      )}
      {...props}
    >
      <div className={s.wrapper}>{children}</div>
    </div>
  );
};

export { s as scrollAreaCss };
