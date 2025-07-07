'use client';

import { useContext, type ReactNode } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { TabsContext } from './TabsProvider';

interface TabsContentProps extends UIComponent<'div'> {
  children: ReactNode;
  value: string | number;
}

export const TabsContent = ({ value, className, sx: propSx, ...props }: TabsContentProps) => {
  const tabsContext = useContext(TabsContext);

  if (tabsContext === undefined) {
    throw new Error('TabsContext must be used within a Tabs.');
  }

  if (tabsContext.value !== value) {
    return null;
  }

  return <div className={clsx(className, sx(propSx))} {...props} />;
};
