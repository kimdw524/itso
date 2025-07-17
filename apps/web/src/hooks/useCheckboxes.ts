import { useCallback, useMemo, useState } from 'react';

export interface CheckboxData<T> {
  name: T;
  checked: boolean;
}

export const useCheckboxes = <T>(
  initialData: CheckboxData<T>[] | (() => CheckboxData<T>[]),
): {
  isAllChecked: boolean;
  isAllUnchecked: boolean;
  checkboxes: CheckboxData<T>[];
  toggle: (name: T) => void;
  checkAll: () => void;
  uncheckAll: () => void;
} => {
  const [checkboxes, setCheckboxes] = useState<CheckboxData<T>[]>(initialData);

  const isAllChecked = useMemo(() => checkboxes.every((checkbox) => checkbox.checked), [checkboxes]);
  const isAllUnchecked = useMemo(() => checkboxes.every((checkbox) => !checkbox.checked), [checkboxes]);

  const toggle = useCallback((name: T) => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox) => ({
        ...checkbox,
        checked: checkbox.name === name ? !checkbox.checked : checkbox.checked,
      })),
    );
  }, []);

  const checkAll = useCallback(() => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox) => ({
        ...checkbox,
        checked: true,
      })),
    );
  }, []);

  const uncheckAll = useCallback(() => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox) => ({
        ...checkbox,
        checked: false,
      })),
    );
  }, []);

  return useMemo(
    () => ({
      isAllChecked,
      isAllUnchecked,
      checkboxes,
      toggle,
      checkAll,
      uncheckAll,
    }),
    [isAllChecked, isAllUnchecked, checkboxes, toggle, checkAll, uncheckAll],
  );
};
