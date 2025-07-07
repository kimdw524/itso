import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './TableRow.css';

interface TableRowProps extends UIComponent<'tr'> {
  isInteractive?: boolean;
}

export const TableRow = ({ isInteractive = false, className, sx: propSx, ...props }: TableRowProps) => {
  return <tr className={clsx(isInteractive && s.interactive, className, sx(propSx))} {...props} />;
};
