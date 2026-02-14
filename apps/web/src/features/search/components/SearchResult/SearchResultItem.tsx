import type { ReactNode } from 'react';

import * as s from './style.css';

interface SearchResultItemProps {
  children: ReactNode;
}

export const SearchResultItem = ({ children }: SearchResultItemProps) => {
  return <div className={s.item}>{children}</div>;
};
