import { Box } from '@kimdw-rtk/ui';

import { JOB_POSTING } from '../../constants';
import { JobPostingItemLoading } from '../JobPostingItem/loading';
import * as s from './style.css';

export const JobPostingListLoading = () => {
  return (
    <Box
      className={s.container}
      sx={{ fontSize: { mobile: 'sm', desktop: '1rem' } }}
    >
      {new Array(JOB_POSTING.LIST_LIMIT).fill(0).map((_, index) => (
        <JobPostingItemLoading key={index} />
      ))}
    </Box>
  );
};
