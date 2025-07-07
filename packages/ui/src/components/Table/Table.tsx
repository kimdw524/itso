import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Table.css';

interface TableProps extends UIComponent<'table'> {
  isStriped?: boolean;
}

export const Table = ({ isStriped, className, sx: propSx, ...props }: TableProps) => {
  return <table className={clsx(s.table, isStriped && s.striped, sx(propSx), className)} {...props} />;
};

export { s as tableCss };
