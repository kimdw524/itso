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

import { useCheckboxes } from '@/hooks/useCheckboxes';

interface CheckboxModalProps<T>
  extends Omit<ComponentProps<typeof Dialog>, 'defaultChecked'> {
  header: ReactNode;
  items: T[];
  defaultChecked: T[];
  renderChildren: (data: T) => ReactNode;
  onConfirm: (checked: T[]) => void;
}

export const CheckboxModal = <T extends number | string>({
  header,
  items,
  defaultChecked,
  renderChildren,
  onConfirm,
  ...rest
}: CheckboxModalProps<T>) => {
  const { close } = useOverlay();
  const {
    checked,
    isAllChecked,
    isAllUnchecked,
    toggle,
    checkAll,
    uncheckAll,
  } = useCheckboxes<T>(items, defaultChecked);

  const handleConfirmClick = () => {
    onConfirm(checked);
    close();
  };

  return (
    <Dialog {...rest}>
      <DialogHeader onCloseClick={close}>{header}</DialogHeader>
      <DialogContent>
        <Box flex flexWrap="wrap" gap="md" padding="lg" rounded>
          {items.map((name) => {
            const isChecked = checked.includes(name);

            return (
              <Button
                key={name}
                variant={isChecked ? 'contained' : 'outlined'}
                color={isChecked ? 'primary' : 'secondary'}
                onClick={() => toggle(name)}
              >
                {renderChildren(name)}
              </Button>
            );
          })}
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
