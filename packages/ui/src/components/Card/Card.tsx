import { type CSSProperties } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Card.css';

interface CardProps extends UIComponent<'div', typeof s.card> {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export const Card = ({
  width,
  height,
  color = 'card',
  variant = 'outlined',
  className,
  style,
  sx: propSx,
  ...props
}: CardProps) => {
  return (
    <div
      className={clsx(s.card({ color, variant }), className, sx(propSx))}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};

export { s as cardCss };
