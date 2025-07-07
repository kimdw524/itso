'use client';

import { useReducer } from 'react';

import clsx from 'clsx';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import * as s from './Accordion.css';
import { AccordionContext, accordionReducer } from './AccordionContext';

interface AccordionProps extends UIComponent<'div', typeof s.accordion> {
  isExpanded?: boolean;
}

export const Accordion = ({
  children,
  className,
  isPadding = true,
  isExpanded: initIsExpaned = false,
  sx: propSx,
  ...props
}: AccordionProps) => {
  const [isExpanded, dispatch] = useReducer(accordionReducer, initIsExpaned);

  return (
    <div className={clsx(s.accordion({ isPadding }), className, sx(propSx))} {...props}>
      <AccordionContext.Provider value={{ isExpanded, dispatch }}>{children}</AccordionContext.Provider>
    </div>
  );
};
