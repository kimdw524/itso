import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

type TableHeaderProps = UIComponent<'thead'>;

export const TableHeader = ({ className, sx: propSx, ...props }: TableHeaderProps) => {
  return <thead className={clsx(className, sx(propSx))} {...props} />;
};
