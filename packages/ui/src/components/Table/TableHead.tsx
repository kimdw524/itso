import { type CSSProperties } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './TableHead.css';

interface TableHeadProps extends UIComponent<'th'> {
  width?: CSSProperties['width'];
  textAlign?: CSSProperties['textAlign'];
}

export const TableHead = ({ width, textAlign, style, className, sx: propSx, ...props }: TableHeadProps) => {
  return <th style={{ ...style, width, textAlign }} className={clsx(s.tableHead, className, sx(propSx))} {...props} />;
};
