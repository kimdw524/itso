import type { ComponentProps, ReactNode } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@repo/ui';
import { useOverlay } from '@repo/utils';

import { useCheckboxes, type CheckboxData } from '@/hooks/useCheckboxes';

interface CheckboxModalProps<T>
  extends Omit<ComponentProps<typeof Dialog>, 'onSelect'> {
  header: ReactNode;
  items: CheckboxData<T>[] | (() => CheckboxData<T>[]);
  renderChildren: (data: T) => ReactNode;
  onConfirm: (checked: T[]) => void;
}

export const CheckboxModal = <T extends number | string>({
  header,
  items,
  renderChildren,
  onConfirm,
  ...rest
}: CheckboxModalProps<T>) => {
  const { close } = useOverlay();
  const {
    checkboxes,
    isAllChecked,
    isAllUnchecked,
    toggle,
    checkAll,
    uncheckAll,
  } = useCheckboxes<T>(items);

  const handleConfirmClick = () => {
    onConfirm(
      checkboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.name),
    );
    close();
  };

  return (
    <Dialog {...rest}>
      <DialogHeader onCloseClick={close}>{header}</DialogHeader>
      <DialogContent>
        <Box flex flexWrap="wrap" gap="md" padding="lg" rounded>
          {checkboxes.map((checkbox) => (
            <Button
              key={checkbox.name}
              variant={checkbox.checked ? 'contained' : 'outlined'}
              color={checkbox.checked ? 'primary' : 'secondary'}
              onClick={() => toggle(checkbox.name)}
            >
              {renderChildren(checkbox.name)}
            </Button>
          ))}
        </Box>
      </DialogContent>
      <DialogFooter sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          {isAllChecked ? (
            <Button color="accent" onClick={uncheckAll}>
              모두 해제
            </Button>
          ) : (
            <Button color="accent" onClick={checkAll}>
              모두 선택
            </Button>
          )}
        </span>
        <Box flex gap="md">
          <Button color="secondary" onClick={close}>
            취소
          </Button>
          <Button onClick={handleConfirmClick} disabled={isAllUnchecked}>
            적용
          </Button>
        </Box>
      </DialogFooter>
    </Dialog>
  );
};
