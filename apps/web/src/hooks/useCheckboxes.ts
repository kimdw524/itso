import { useCallback, useMemo, useState } from 'react';

export const useCheckboxes = <T>(
  items: T[],
  defaultChecked: T[],
): {
  isAllChecked: boolean;
  isAllUnchecked: boolean;
  checked: T[];
  toggle: (name: T) => void;
  checkAll: () => void;
  uncheckAll: () => void;
} => {
  const [checked, setChecked] = useState<T[]>(defaultChecked);

  const isAllChecked = checked.length === items.length;
  const isAllUnchecked = checked.length === 0;

  const toggle = useCallback((name: T) => {
    setChecked((prev) => {
      const index = prev.indexOf(name);

      if (index === -1) {
        return [...prev, name];
      }

      return prev.splice(index);
    });
  }, []);

  const checkAll = useCallback(() => {
    setChecked([...items]);
  }, [items]);

  const uncheckAll = useCallback(() => {
    setChecked([]);
  }, []);

  return useMemo(
    () => ({
      isAllChecked,
      isAllUnchecked,
      checked,
      toggle,
      checkAll,
      uncheckAll,
    }),
    [isAllChecked, isAllUnchecked, checked, toggle, checkAll, uncheckAll],
  );
};
