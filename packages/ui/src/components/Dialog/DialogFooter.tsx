import clsx from 'clsx';

import { Box } from '#components';
import { sx } from '#styles';
import type { UIComponent } from '#types';

type DialogFooterProps = Omit<UIComponent<'div'>, 'color'>;

export const DialogFooter = ({ children, className, sx: propSx, ...props }: DialogFooterProps) => {
  return (
    <Box flex justifyContent="flex-end" className={clsx(className, sx(propSx))} {...props}>
      {children}
    </Box>
  );
};
