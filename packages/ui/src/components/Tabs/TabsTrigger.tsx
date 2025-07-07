'use client';

import { useContext } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { TabsContext } from './TabsProvider';
import * as s from './TabsTrigger.css';

interface TabsTriggerProps extends UIComponent<'button'> {
  value: number | string;
}

export const TabsTrigger = ({ children, value, className, sx: propSx, ...props }: TabsTriggerProps) => {
  const tabsContext = useContext(TabsContext);

  if (tabsContext === undefined) {
    throw new Error('TabsTrigger must be used within a Tabs.');
  }

  const isSelected = tabsContext.value === value;

  const handleClick = () => {
    tabsContext.setValue(value);
  };

  return (
    <button className={clsx(className, s.container({ isSelected }), sx(propSx))} onClick={handleClick} {...props}>
      {children}
    </button>
  );
};
