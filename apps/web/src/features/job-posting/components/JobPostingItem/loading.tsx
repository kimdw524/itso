import {
  Box,
  Card,
  CardContent,
  CardInteraction,
  Skeleton,
} from '@kimdw-rtk/ui';

import * as s from './style.css';

export const JobPostingItemLoading = () => {
  return (
    <Card className={s.container}>
      <CardInteraction sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* 회사 로고 이미지 */}
        <Box
          alignItems="center"
          justifyContent="center"
          paddingX="2xl"
          paddingY="3xl"
          style={{ height: '8rem' }}
          flex
        >
          <Skeleton height="100%" width="100%" />
        </Box>
        <CardContent sx={{ paddingX: '2xl', paddingY: '3xl' }}>
          <Box
            flexDirection="column"
            justifyContent="space-between"
            sx={{ height: '100%' }}
            flex
          >
            <Box>
              {/* 회사 이름 */}
              <Skeleton
                height="1em"
                sx={{ marginBottom: 'md', fontSize: 'sm' }}
                width="5em"
              />
              {/* 공고 제목 */}
              <Skeleton height="3em" width="100%" />
              {/* 태그 */}
              <Box flexWrap="wrap" gap="md" marginY="2xl" flex>
                <Skeleton height="1.75em" width="6em" />
                <Skeleton height="1.75em" width="4em" />
                <Skeleton height="1.75em" width="4em" />
              </Box>
            </Box>
            <Box
              alignItems="center"
              gap="lg"
              justifyContent="space-between"
              flex
            >
              <Skeleton height="1em" sx={{ fontSize: 'sm' }} width="4em" />
              <Box gap="lg" flex>
                <Skeleton height="1em" width="4em" />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardInteraction>
    </Card>
  );
};
