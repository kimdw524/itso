'use client';

import { cloneElement, type ReactElement } from 'react';

import { createLogo, type CreateLogRequest } from '@/api/log/createLog';

interface LogOnClickProps extends CreateLogRequest {
  children: ReactElement<{ onClick?: () => void }>;
}

export const LogOnClick = ({ children, ...rest }: LogOnClickProps) => {
  const handleClick = () => {
    void createLogo(rest);
    children.props?.onClick?.();
  };

  return cloneElement(children, { onClick: handleClick });
};
