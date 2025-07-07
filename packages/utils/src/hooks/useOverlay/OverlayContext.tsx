'use client';

import { createContext } from 'react';

import type { OverlayContextType } from './types';

export const OverlayContext = createContext<OverlayContextType>(undefined);
