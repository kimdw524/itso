import { type CSSProperties } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './TableCell.css';

interface TableCellProps extends UIComponent<'td'> {
  width?: CSSProperties['width'];
  textAlign?: CSSProperties['textAlign'];
}

export const TableCell = ({ width, textAlign, style, className, sx: propSx, ...props }: TableCellProps) => {
  return <td style={{ ...style, width, textAlign }} className={clsx(s.tableCell, className, sx(propSx))} {...props} />;
};
