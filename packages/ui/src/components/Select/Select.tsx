'use client';

import { useEffect, useImperativeHandle, useReducer, useRef, type CSSProperties, type RefObject } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Select.css';
import { SelectContext, selectReducer } from './SelectContext';
import SelectOptionList from './SelectOptionList';
import SelectTrigger from './SelectTrigger';

interface SelectProps extends Omit<UIComponent<'div', typeof s.select>, 'ref' | 'onChange'> {
  ref?: RefObject<{ value?: string } | null>;
  name?: string;
  width?: CSSProperties['width'];
  defaultValue?: string;
  onChange?: (value: string | undefined) => void;
}

export const Select = ({
  children,
  ref,
  className,
  style,
  name,
  defaultValue,
  width = '100%',
  size = 'md',
  sx: propSx,
  onChange,
  ...props
}: SelectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(selectReducer, {
    isActive: false,
    containerRef,
    defaultValue,
    items: new Map(),
  });

  useImperativeHandle(
    ref,
    () => ({
      value: state.selected,
    }),
    [state.selected],
  );

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (container.contains(e.target as Node) || !state.isActive) {
        return;
      }

      dispatch({ type: 'TOGGLE' });
    };

    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [state.isActive, dispatch]);

  useEffect(() => {
    if (!onChange || !state.items.size) {
      return;
    }

    onChange(state.selected);
    //eslint-disable-next-line
  }, [state.selected]);

  return (
    <SelectContext.Provider value={{ state, dispatch }}>
      <div
        ref={containerRef}
        style={{ ...style, width }}
        className={clsx(s.select({ size }), className, sx(propSx))}
        {...props}
      >
        <SelectTrigger>{state.selected !== null && state.items.get(state.selected || '')}</SelectTrigger>
        <SelectOptionList>{children}</SelectOptionList>
        <input type="hidden" name={name} value={state.selected || ''} />
      </div>
    </SelectContext.Provider>
  );
};

export { s as selectCss };
