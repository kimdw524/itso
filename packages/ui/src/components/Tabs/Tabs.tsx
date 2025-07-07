'use client';

import { useReducer } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { TabsContext, tabsReducer } from './TabsProvider';

interface TabsProps extends UIComponent<'div'> {
  defaultValue?: number | string;
}

export const Tabs = ({ children, defaultValue, className, sx: propSx, ...props }: TabsProps) => {
  const [value, setValue] = useReducer(tabsReducer, defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={clsx(className, sx(propSx))} style={{ width: '100%' }} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};
