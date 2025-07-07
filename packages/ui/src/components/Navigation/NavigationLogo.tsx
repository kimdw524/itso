import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationLogo.css';

type NavigationLogoProps = UIComponent<'div'>;

export const NavigationLogo = ({ className, sx: propSx, ...props }: NavigationLogoProps) => {
  return <div className={clsx(s.navigationLogo, className, sx(propSx))} {...props} />;
};
