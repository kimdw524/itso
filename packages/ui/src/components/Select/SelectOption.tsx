'use client';

import { useContext, useEffect, type ReactNode } from 'react';

import { SelectContext } from './SelectContext';
import * as s from './SelectOption.css';

interface SelectOptionProps {
  children: ReactNode;
  value: string;
}

export const SelectOption = ({ children, value }: SelectOptionProps) => {
  const selectContext = useContext(SelectContext);

  if (!selectContext) {
    throw new Error('SelectOption must be rendered within a Select.');
  }

  const { dispatch } = selectContext;

  useEffect(() => {
    dispatch({ type: 'ADD', payload: { value, children } });

    return () => {
      dispatch({ type: 'REMOVE', payload: { value } });
    };
    // eslint-disable-next-line
  }, [dispatch, value]);

  const handleClick = () => {
    dispatch({ type: 'SELECT', payload: { value } });
  };

  return (
    <div className={s.selectOption} onClick={handleClick}>
      {children}
    </div>
  );
};
