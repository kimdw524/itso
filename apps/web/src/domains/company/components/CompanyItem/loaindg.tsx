import { Box, Skeleton } from '@repo/ui';

export const CompanyItemLoading = () => {
  return (
    <Box
      flex
      alignItems={{ desktop: 'center', mobile: 'flex-start' }}
      justifyContent="space-between"
      gap="lg"
      paddingX="xl"
      paddingY="2xl"
      flexDirection={{ desktop: 'row', mobile: 'column' }}
    >
      <div>
        <Skeleton width="10rem" height="1.5rem" />
        <Skeleton
          width="10rem"
          height="1em"
          sx={{ marginTop: '2xl', marginBottom: 'xl', fontSize: 'xl' }}
        />

        <Box flex alignItems="center" gap="md">
          <Skeleton width="4rem" height="1em" />
          <Skeleton width="6rem" height="1em" />
        </Box>
      </div>
      <Box flex alignItems="center">
        <Skeleton width="9rem" height="1em" />
      </Box>
    </Box>
  );
};
