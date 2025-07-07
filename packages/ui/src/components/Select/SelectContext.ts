import { createContext, type ActionDispatch, type ReactNode } from 'react';

type SelectState = {
  isActive: boolean;
  selected?: string;
  defaultValue?: string;
  items: Map<string, ReactNode>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

type SelectAction =
  | { type: 'ADD'; payload: { value: string; children: ReactNode } }
  | { type: 'REMOVE'; payload: { value: string } }
  | { type: 'SELECT'; payload: { value: string } }
  | { type: 'TOGGLE' };

export const SelectContext = createContext<
  { state: SelectState; dispatch: ActionDispatch<[SelectAction]> } | undefined
>(undefined);

export const selectReducer = (state: SelectState, action: SelectAction): SelectState => {
  switch (action.type) {
    case 'ADD': {
      // 현재 selected가 없고, defaultValue === payload.value일 경우 select함.
      if (state.selected === undefined && state.defaultValue === action.payload.value) {
        return {
          ...state,
          selected: action.payload.value,
          items: new Map(state.items).set(action.payload.value, action.payload.children),
        };
      }
      return { ...state, items: new Map(state.items).set(action.payload.value, action.payload.children) };
    }
    case 'REMOVE': {
      const newMap = new Map(state.items);
      newMap.delete(action.payload.value);
      return { ...state, items: newMap };
    }
    case 'SELECT':
      return { ...state, isActive: false, selected: action.payload.value };
    case 'TOGGLE':
      return { ...state, isActive: !state.isActive };
  }
};
