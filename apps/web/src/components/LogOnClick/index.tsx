'use client';

import { cloneElement, type ReactElement } from 'react';

import { LogService } from '@/domains/log/services/LogService';
import type { RequestType } from '@/utils/http';

interface LogOnClickProps extends RequestType<typeof LogService.create> {
  children: ReactElement<{ onClick?: () => void }>;
}

export const LogOnClick = ({ children, ...rest }: LogOnClickProps) => {
  const handleClick = () => {
    void LogService.create(rest);
    children.props?.onClick?.();
  };

  return cloneElement(children, { onClick: handleClick });
};
