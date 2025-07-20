'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { usePointerSlider } from '../../hooks/usePointerSlider';
import * as s from './Range.css';

interface RangeProps extends Omit<UIComponent<'div', typeof s.range>, 'children' | 'onChange'> {
  min: number;
  max: number;
  defaultMinValue: number;
  defaultMaxValue: number;
  onChange: (min: number, max: number) => void;
}

export const Range = ({
  min,
  max,
  defaultMinValue,
  defaultMaxValue,
  onChange,
  className,
  color = 'primary',
  size = 'md',
  sx: propSx,
  ...props
}: RangeProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const leftThumbRef = useRef<HTMLSpanElement>(null);
  const rightThumbRef = useRef<HTMLSpanElement>(null);
  const leftValue = usePointerSlider(leftThumbRef, { min, max, defaultValue: defaultMinValue }),
    rightValue = usePointerSlider(rightThumbRef, { min, max, defaultValue: defaultMaxValue });
  const initRef = useRef<boolean>(false);

  const minValue = Math.min(leftValue, rightValue),
    maxValue = Math.max(leftValue, rightValue);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      return;
    }

    onChange(minValue, maxValue);
    // eslint-disable-next-line
  }, [minValue, maxValue]);

  return (
    <div className={clsx(s.range({ color, size }), className, sx(propSx))} {...props}>
      <div className={s.bar}>
        <div
          ref={barRef}
          className={s.fill}
          style={{
            left: `${((minValue - min) / (max - min)) * 100}%`,
            right: `${(1 - (maxValue - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <span ref={leftThumbRef} className={s.thumb} />
      <span ref={rightThumbRef} className={s.thumb} />
    </div>
  );
};

export { s as rangeCss };
