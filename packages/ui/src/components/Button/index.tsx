'use client';

import { useRef, type ReactElement } from 'react';

import { clsx } from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Button.css';

interface ButtonProps
  extends Omit<UIComponent<'button', typeof s.button>, 'hasIcon'> {
  icon?: ReactElement;
}

export const Button = ({
  children,
  ref,
  color = 'primary',
  size = 'md',
  variant = 'contained',
  pulse = false,
  className,
  sx: propSx,
  icon,
  ...props
}: ButtonProps) => {
  const elementRef = useRef<HTMLButtonElement>(null);
  const { ripple } = useRipple<HTMLButtonElement>(ref || elementRef);

  return (
    <button
      className={clsx(
        className,
        s.button({ color, size, variant, pulse, hasIcon: icon !== undefined }),
        sx(propSx),
      )}
      ref={ref || elementRef}
      {...props}
    >
      {icon !== undefined && <span className={s.icon}>{icon}</span>}
      <span className={s.span({ size })}>{children}</span>
      {ripple}
    </button>
  );
};
export { s as buttonCss };
