'use client';

import { useRef } from 'react';

import { clsx } from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Button.css';

type ButtonProps = UIComponent<'button', typeof s.button>;

export const Button = ({
  children,
  ref,
  color = 'primary',
  size = 'md',
  variant = 'contained',
  pulse = false,
  className,
  sx: propSx,
  ...props
}: ButtonProps) => {
  const elementRef = useRef<HTMLButtonElement>(null);
  const { ripple } = useRipple<HTMLButtonElement>(ref || elementRef);

  return (
    <button
      className={clsx(
        className,
        s.button({ color, size, variant, pulse }),
        sx(propSx),
      )}
      ref={ref || elementRef}
      {...props}
    >
      <span className={s.span({ size })}>{children}</span>
      {ripple}
    </button>
  );
};
export { s as buttonCss };
