'use client';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationAside.css';

type NavigationAsideProps = UIComponent<'aside'>;

export const NavigationAside = ({
  children,
  className,
  sx: propSx,
  ...props
}: NavigationAsideProps) => {
  return (
    <aside className={clsx(className, sx(propSx))} {...props}>
      <div className={s.wide}>{children}</div>
    </aside>
  );
};
