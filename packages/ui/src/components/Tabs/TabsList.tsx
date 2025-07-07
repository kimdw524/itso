import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './TabsList.css';

type TabsListProps = UIComponent<'div'>;

export const TabsList = ({ children, className, sx: propSx, ...props }: TabsListProps) => {
  return (
    <div className={clsx(className, s.container, sx(propSx))} {...props}>
      {children}
    </div>
  );
};
