import type { ReactNode } from 'react';

import { Box, Typography } from '@kimdw-rtk/ui';
import { FrownIcon } from 'lucide-react';

import { FaceIcon } from '@/shared/components';

import * as s from './style.css';

interface EmptyJobPostingListProps {
  title: ReactNode;
  description: ReactNode;
}
export const EmptyJobPostingList = ({
  title,
  description,
}: EmptyJobPostingListProps) => {
  return (
    <Box className={s.container} padding="lg">
      <FaceIcon>
        <FrownIcon size="2.5rem" />
      </FaceIcon>
      <Typography
        fontSize="xl"
        fontWeight="semiBold"
        lineHeight="md"
        sx={{ marginTop: '2xl' }}
        textAlign="center"
        wordBreak="break-word"
      >
        {title}
      </Typography>
      <Typography
        fontSize="lg"
        lineHeight="md"
        textAlign="center"
        wordBreak="break-word"
      >
        {description}
      </Typography>
    </Box>
  );
};
