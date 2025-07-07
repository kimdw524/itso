'use client';

import { useState } from 'react';

import clsx from 'clsx';
import { AlignJustifyIcon, XIcon } from 'lucide-react';

import { Box, Button } from '#components';
import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './NavigationAside.css';

type NavigationAsideProps = UIComponent<'aside'>;

export const NavigationAside = ({ children, className, sx: propSx, ...props }: NavigationAsideProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <aside className={clsx(s.navigationAside, className, sx(propSx))} {...props}>
      <div className={s.narrow}>
        <Button size="icon-md" color="secondary" variant="ghost" onClick={handleClick}>
          <AlignJustifyIcon />
        </Button>
        <div className={s.popup({ isVisible: isExpanded })}>
          <Box flex justifyContent="flex-end" marginBottom="md">
            <Button size="icon-md" variant="ghost" color="secondary" onClick={handleClick}>
              <XIcon />
            </Button>
          </Box>
          <Box flex gap="md" alignItems="center" justifyContent="flex-end">
            {children}
          </Box>
        </div>
      </div>
      <div className={s.wide}>{children}</div>
    </aside>
  );
};
