import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Chip.css';

type ChipProps = UIComponent<'div', typeof s.chip>;

export const Chip = ({ children, className, color = 'primary', size = 'md', sx: propSx, ...props }: ChipProps) => {
  return (
    <div className={clsx(s.chip({ color, size }), className, sx(propSx))} {...props}>
      <span>{children}</span>
    </div>
  );
};

export { s as chipCss };
