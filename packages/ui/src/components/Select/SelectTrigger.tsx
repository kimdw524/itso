import { useContext } from 'react';

import clsx from 'clsx';
import { ChevronDownIcon } from 'lucide-react';

import { sx } from '#styles';
import type { UIComponent } from '#types';

import { SelectContext } from './SelectContext';
import * as s from './SelectTrigger.css';

type SelectTriggerProps = UIComponent<'div', typeof s.selectTrigger>;

const SelectTrigger = ({ children, className, sx: propSx }: SelectTriggerProps) => {
  const selectContext = useContext(SelectContext);

  if (!selectContext) {
    throw new Error('SelectTrigger must be rendered within a Select.');
  }

  const { state, dispatch } = selectContext;

  const handleClick = () => {
    dispatch({ type: 'TOGGLE' });
  };

  return (
    <div className={clsx(s.selectTrigger({ isActive: state.isActive }), className, sx(propSx))} onClick={handleClick}>
      <span className={s.children}>{children}</span>
      <span className={s.icon({ isActive: state.isActive })}>
        <ChevronDownIcon size="1em" strokeWidth="2px" />
      </span>
    </div>
  );
};

export default SelectTrigger;
