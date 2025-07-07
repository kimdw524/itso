'use client';

import React, { createContext } from 'react';

interface TabsContext {
  value: number | string | undefined;
  setValue: React.ActionDispatch<[value: number | string]>;
}

export const TabsContext = createContext<TabsContext | undefined>(undefined);

export const tabsReducer = (_: TabsContext['value'], value: TabsContext['value']) => {
  return value;
};
