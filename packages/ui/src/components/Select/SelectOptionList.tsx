import { useContext, useMemo, useRef, type ReactNode } from 'react';

import clsx from 'clsx';

import { sprinkles } from '#styles';

import { SelectContext } from './SelectContext';
import * as s from './SelectOptionList.css';

interface SelectOptionListProps {
  children: ReactNode;
}

const SelectOptionList = ({ children }: SelectOptionListProps) => {
  const selectContext = useContext(SelectContext);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!selectContext) {
    throw new Error('SelectOption must be rendered within a Select.');
  }

  const { state } = selectContext;

  const isAbove = useMemo(() => {
    const container = containerRef.current;
    const parent = state.containerRef.current;

    if (!state.isActive || !container || !parent) {
      return;
    }

    const parentRect = parent.getBoundingClientRect();
    container.style.display = 'block';
    const containerRect = container.getBoundingClientRect();
    container.style.display = '';

    // 하단에 리스트를 모두 보여줄 공간이 충분한 경우
    if (containerRect.top + containerRect.height < window.innerHeight) {
      return true;
    }

    // 그렇지 않으면 parent의 상단/하단 중 공간이 더 넓은 쪽으로 리스트를 보여줌
    return parentRect.top + parentRect.height / 2 < window.innerHeight / 2;
  }, [state.isActive, state.containerRef]);

  return (
    <div
      ref={containerRef}
      className={clsx(s.container({ isVisible: state.isActive, isAbove }), sprinkles({ boxShadow: 'accent-sm' }))}
    >
      {children}
    </div>
  );
};

export default SelectOptionList;
