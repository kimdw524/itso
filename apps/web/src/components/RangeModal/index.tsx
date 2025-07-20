import { useState, type ComponentProps, type ReactNode } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Range,
  Typography,
} from '@repo/ui';
import { useOverlay } from '@repo/utils';

interface RangeModalProps extends ComponentProps<typeof Dialog> {
  header: ReactNode;
  min: number;
  max: number;
  defaultMinValue: number;
  defaultMaxValue: number;
  renderDescription: (min: number, max: number) => ReactNode;
  onConfirm: (min: number, max: number) => void;
}

export const RangeModal = ({
  header,
  min,
  max,
  defaultMinValue,
  defaultMaxValue,
  renderDescription,
  onConfirm,
  ...rest
}: RangeModalProps) => {
  const { close } = useOverlay();
  const [minValue, setMinValue] = useState<number>(defaultMinValue);
  const [maxValue, setMaxValue] = useState<number>(defaultMaxValue);

  const handleConfirmClick = () => {
    onConfirm(minValue, maxValue);
    close();
  };

  const handleChange = (min: number, max: number) => {
    setMinValue(min);
    setMaxValue(max);
  };

  return (
    <Dialog {...rest}>
      <DialogHeader onCloseClick={close}>{header}</DialogHeader>
      <DialogContent>
        <Typography
          fontSize="lg"
          fontWeight="medium"
          sx={{ marginY: 'md' }}
          style={{ textAlign: 'center' }}
        >
          {renderDescription(minValue, maxValue)}
        </Typography>
        <Box padding="xl">
          <Range
            min={min}
            max={max}
            defaultMinValue={defaultMinValue}
            defaultMaxValue={defaultMaxValue}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogFooter sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box flex gap="md">
          <Button color="secondary" onClick={close}>
            취소
          </Button>
          <Button onClick={handleConfirmClick}>적용</Button>
        </Box>
      </DialogFooter>
    </Dialog>
  );
};
