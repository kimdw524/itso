'use client';

import { type ReactNode, useContext } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { AccordionContext } from './AccordionContext';
import * as s from './AccordionTrigger.css';

interface AccordionTriggerProps {
  children: ReactNode;
  iconPosition?: 'text' | 'right';
}

export const AccordionTrigger = ({ children, iconPosition = 'right' }: AccordionTriggerProps) => {
  const accordionContext = useContext(AccordionContext);

  if (!accordionContext) {
    throw new Error('AccordionTrigger must be used within an Accordion component.');
  }

  const { dispatch, isExpanded } = accordionContext;

  return (
    <div
      className={s.triggerContainer({ iconPosition })}
      aria-expanded={isExpanded}
      onClick={() => dispatch(!isExpanded)}
    >
      <span>{children}</span>
      <span className={s.arrow({ expand: isExpanded })}>
        <ChevronDownIcon size="1em" />
      </span>
    </div>
  );
};
