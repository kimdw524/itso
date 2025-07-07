'use client';

import { useRef } from 'react';

import clsx from 'clsx';

import { useRipple } from '#hooks';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './CardInteraction.css';

type CardInteractionProps = UIComponent<'div'>;

export const CardInteraction = ({ children, ref, className, sx: propSx, ...props }: CardInteractionProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { ripple } = useRipple<HTMLDivElement>(ref || elementRef);

  return (
    <div
      className={clsx(className, s.cardInteraction, s.cardInteraction, sx(propSx))}
      ref={ref || elementRef}
      {...props}
    >
      {children}
      {ripple}
    </div>
  );
};
