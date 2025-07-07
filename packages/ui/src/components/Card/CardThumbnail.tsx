import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './CardThumbnail.css';

type CardThumbnailProps = UIComponent<'img'>;

export const CardThumbnail = ({ className, sx: propSx, ...props }: CardThumbnailProps) => {
  return <img className={clsx(s.thumbnail, className, sx(propSx))} {...props} />;
};
