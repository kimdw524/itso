import type { ReactNode } from 'react';

import * as s from './style.css';

export const FaceIcon = ({ children }: { children: ReactNode }) => {
  return <div className={s.icon}>{children}</div>;
};
