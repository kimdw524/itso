import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationContainer.css';

type NavigationContainerProps = UIComponent<'div'>;

export const NavigationContainer = ({
  children,
  className,
  sx: propSx,
  ...props
}: NavigationContainerProps) => {
  return (
    <div className={clsx(className, s.container, sx(propSx))} {...props}>
      {children}
    </div>
  );
};
