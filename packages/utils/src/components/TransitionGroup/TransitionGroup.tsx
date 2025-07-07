'use client';

import React, { useCallback, useEffect, useState, type ReactElement, type ReactNode } from 'react';

import { TransitionChild } from '#components/TransitionGroup';

interface ChildElement {
  children: ReactElement;
  isUnmounted: boolean;
  id: number;
}

const filterChildren = (children: ReactNode | ReactNode[]) => {
  const result: ChildElement[] = [];

  if (Array.isArray(children)) {
    for (const child of children) {
      if (!React.isValidElement(child)) {
        continue;
      }
      result.push({ children: child, isUnmounted: false, id: 0 });
    }
  } else {
    if (React.isValidElement(children)) {
      result.push({ children, isUnmounted: false, id: 0 });
    }
  }

  return result;
};

interface TransitionGroupProps {
  children: ReactNode | ReactNode[];
}

export const TransitionGroup = ({ children }: TransitionGroupProps) => {
  const [rendered, setRendered] = useState<ChildElement[]>(() => filterChildren(children));

  const handleRequestUnmount = useCallback((key: string | null) => {
    setRendered((rendered) => rendered.filter((child) => child.children.key !== key));
  }, []);

  useEffect(() => {
    setRendered((rendered) => {
      const presentChildren = [...filterChildren(children)];
      const presentKeys = new Set<string | null>(presentChildren.map((child) => child.children.key));

      for (let i = 0; i < rendered.length; i++) {
        const child = rendered[i]!;
        if (presentKeys.has(child.children.key)) {
          // unmount중인 요소와 같은 key를 가진 요소가 또 들어온 경우, requestUnmount를 기다리지 않고 바로 제거한다.
          if (child.isUnmounted) {
            const presentChild = presentChildren.find(
              (presentChild) => presentChild.children.key === child.children.key,
            );

            if (presentChild !== undefined) {
              /**
               * 새 요소는 unmount 중인 요소보다 id값을 1 높게 설정해 준다.
               * - id는 렌더 트리에서 기존 요소를 제거할 때 활용한다.
               */
              presentChild.id = child.id + 1;
            }

            rendered.splice(i--, 1);
          }
          continue;
        }

        child.isUnmounted = true;
        presentChildren.splice(i, 0, child);
      }

      return presentChildren;
    });
  }, [children]);

  return (
    <>
      {rendered.map((child) => (
        <TransitionChild
          key={child.children.key}
          id={child.id}
          elementKey={child.children.key}
          isUnmounted={child.isUnmounted}
          onRequestUnmount={handleRequestUnmount}
        >
          {child.children}
        </TransitionChild>
      ))}
    </>
  );
};
