import type { CSSProperties } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import * as s from './style.css';

interface FilterButtonProps {
  children: string | string[];
  width?: CSSProperties['width'];
  onClick?: () => void;
}

export const FilterButton = ({
  children,
  width,
  onClick,
}: FilterButtonProps) => {
  return (
    <div className={s.filterButton} style={{ width }} onClick={onClick}>
      <span className={s.children}>
        {Array.isArray(children) ? children.join(', ') : children}
      </span>
      <span className={s.icon}>
        <ChevronDownIcon size="1em" strokeWidth="2px" />
      </span>
    </div>
  );
};
