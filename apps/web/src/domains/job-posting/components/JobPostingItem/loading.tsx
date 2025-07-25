import { Box, Card, CardContent, CardInteraction, Skeleton } from '@repo/ui';

export const JobPostingItemLoading = () => {
  return (
    <Card variant="glass">
      <CardInteraction sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* 회사 로고 이미지 */}
        <Box
          flex
          alignItems="center"
          justifyContent="center"
          paddingX="2xl"
          paddingY="3xl"
          style={{ height: '9rem' }}
        >
          <Skeleton width="100%" height="100%" />
        </Box>
        <CardContent sx={{ paddingX: '2xl', paddingY: '3xl' }}>
          <Box
            flex
            flexDirection="column"
            justifyContent="space-between"
            sx={{ height: '100%' }}
          >
            <Box>
              {/* 회사 이름 */}
              <Skeleton
                width="5em"
                height="1em"
                sx={{ marginBottom: 'lg', fontSize: 'sm' }}
              />
              {/* 공고 제목 */}
              <Skeleton width="100%" height="3em" />
              {/* 태그 */}
              <Box flex flexWrap="wrap" gap="md" marginY="2xl">
                <Skeleton width="6em" height="1.75em" />
                <Skeleton width="4em" height="1.75em" />
                <Skeleton width="4em" height="1.75em" />
              </Box>
            </Box>
            <Box
              flex
              alignItems="center"
              justifyContent="space-between"
              gap="lg"
            >
              <Skeleton width="4em" height="1em" sx={{ fontSize: 'sm' }} />
              <Box flex gap="lg">
                <Skeleton width="4em" height="1em" />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardInteraction>
    </Card>
  );
};
