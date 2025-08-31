import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationItem.css';

type NavigationItemProps = UIComponent<'div', typeof s.container>;

export const NavigationItem = ({
  style,
  className,
  sx: propSx,
  isSelected = false,
  ...props
}: NavigationItemProps) => {
  return (
    <div
      style={{ ...style }}
      className={clsx(s.container({ isSelected }), className, sx(propSx))}
      {...props}
    />
  );
};
