import { type CSSProperties } from 'react';

import { clsx } from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Skeleton.css';

interface SkeletonProps extends UIComponent<'div'> {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export const Skeleton = ({ className, width, height, style, sx: propSx, ...props }: SkeletonProps) => {
  return <div className={clsx(s.skeleton, className, sx(propSx))} style={{ ...style, width, height }} {...props} />;
};
