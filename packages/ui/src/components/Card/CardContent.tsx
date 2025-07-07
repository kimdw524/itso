import { clsx } from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './CardContent.css';

type CardContentProps = UIComponent<'div'>;

export const CardContent = ({ className, sx: propSx, ...props }: CardContentProps) => {
  return <div className={clsx(s.cardContent, className, sx(propSx))} {...props} />;
};
