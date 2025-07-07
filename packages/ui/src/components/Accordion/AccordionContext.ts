import { type ActionDispatch, createContext } from 'react';

export const AccordionContext = createContext<
  { isExpanded: boolean; dispatch: ActionDispatch<[action: boolean]> } | undefined
>(undefined);

export const accordionReducer = (_: boolean, action: boolean) => {
  return action;
};
