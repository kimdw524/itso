import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationBar.css';

type NavigationBarProps = UIComponent<'nav', typeof s.navigationBar>;

export const NavigationBar = ({
  className,
  size = 'md',
  sx: propSx,
  ...props
}: NavigationBarProps) => {
  return (
    <nav
      className={clsx(s.navigationBar({ size }), className, sx(propSx))}
      {...props}
    />
  );
};

export { s as navigationBarCss };
