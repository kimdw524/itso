import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationItem.css';

type NavigationItemProps = UIComponent<'div'>;

export const NavigationItem = ({
  style,
  className,
  sx: propSx,
  ...props
}: NavigationItemProps) => {
  return (
    <div
      style={{ ...style }}
      className={clsx(s.container, className, sx(propSx))}
      {...props}
    />
  );
};
