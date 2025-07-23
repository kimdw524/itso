import type { ReactNode } from 'react';

import clsx from 'clsx';

import { sx, type UIComponent } from '@repo/ui';

import * as s from './style.css';

interface DisableWrapperProps extends UIComponent<'div'> {
  children: ReactNode;
  condition: boolean;
}

export const DisableWrapper = ({
  children,
  condition,
  className,
  sx: propSx,
}: DisableWrapperProps) => {
  return (
    <div className={clsx(className, sx(propSx), condition && s.disable)}>
      {children}
    </div>
  );
};
