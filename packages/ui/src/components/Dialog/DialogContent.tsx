import clsx from 'clsx';

import { Box } from '#components';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './DialogContent.css';

type DialogContentProps = Omit<UIComponent<'div'>, 'color'>;

export const DialogContent = ({ children, className, sx: propSx, ...props }: DialogContentProps) => {
  return (
    <Box className={clsx(s.container, className, sx(propSx))} {...props}>
      {children}
    </Box>
  );
};
