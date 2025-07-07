import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

type TableBodyProps = UIComponent<'tbody'>;

export const TableBody = ({ className, sx: propSx, ...props }: TableBodyProps) => {
  return <tbody className={clsx(className, sx(propSx))} {...props} />;
};
