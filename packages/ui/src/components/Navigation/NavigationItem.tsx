import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

type NavigationItemProps = UIComponent<'div'>;

export const NavigationItem = ({ style, className, sx: propSx, ...props }: NavigationItemProps) => {
  return <div style={{ lineHeight: 0, ...style }} className={clsx(className, sx(propSx))} {...props} />;
};
