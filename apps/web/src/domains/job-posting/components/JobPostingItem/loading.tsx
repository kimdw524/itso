import { Box, Card, CardContent, Skeleton } from '@repo/ui';

export const JobPostingItemLoading = () => {
  return (
    <Card sx={{ backgroundColor: 'background' }}>
      <Box
        flex
        alignItems="center"
        justifyContent="center"
        padding="xl"
        style={{ height: '7rem', backgroundColor: '#fff' }}
      >
        <Skeleton width="100%" height="100%" />
      </Box>
      <CardContent sx={{ padding: 'xl' }}>
        <Skeleton
          width="4em"
          height="1em"
          sx={{ marginBottom: 'md', fontSize: 'sm' }}
        />
        <Skeleton width="100%" height="2.5em" />
        <Box flex flexWrap="wrap" gap="md" marginY="lg">
          <Skeleton width="4em" height="1.75em" />
          <Skeleton width="4em" height="1.75em" />
          <Skeleton width="4em" height="1.75em" />
        </Box>
        <Box flex alignItems="center" justifyContent="space-between" gap="lg">
          <Skeleton width="4em" height="1em" sx={{ fontSize: 'sm' }} />
          <Box flex gap="lg">
            <Skeleton width="4em" height="1em" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
