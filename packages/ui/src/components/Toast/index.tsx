import clsx from 'clsx';

import { Box } from '#components';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Toast.css';

interface ToastProps extends UIComponent<'div', typeof s.toast> {
  duration?: number;
}

export const Toast = ({ children, color = 'accent', className, duration = 0, sx: propSx, ...props }: ToastProps) => {
  return (
    <Box boxShadow="accent-sm" rounded className={clsx(s.toast({ color }), className, sx(propSx))} {...props}>
      <div
        className={s.progress({ animation: duration !== 0 })}
        style={{ animationDuration: duration > 0 ? `${duration}ms` : undefined }}
      ></div>
      <span style={{ position: 'relative' }}>{children}</span>
    </Box>
  );
};

export { s as toastCss };
