import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationMenu.css';

type NavigationMenuProps = UIComponent<'div'>;

export const NavigationMenu = ({ className, sx: propSx, ...props }: NavigationMenuProps) => {
  return <div className={clsx(s.navigationMenu, className, sx(propSx))} {...props} />;
};
export { s as navigationMenuCss };
