'use client';

import { useState, type ReactNode } from 'react';

import { AlignJustifyIcon, XIcon } from 'lucide-react';

import { Box, Button } from '#components';

import * as s from './NavigationDrawer.css';

export const NavigationDrawer = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <div className={s.wide}>{children}</div>
      <div className={s.narrow}>
        <Button
          size="icon-md"
          color="secondary"
          variant="ghost"
          onClick={handleClick}
        >
          <AlignJustifyIcon />
        </Button>
        <div className={s.popup({ isVisible: isExpanded })}>
          <Box flex justifyContent="flex-end" marginBottom="md">
            <Button
              size="icon-md"
              variant="ghost"
              color="secondary"
              onClick={handleClick}
            >
              <XIcon />
            </Button>
          </Box>
          <Box
            flex
            gap="xl"
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent="center"
            paddingY="lg"
          >
            {children}
          </Box>
        </div>
      </div>
    </>
  );
};
