import { Box, Skeleton } from '@kimdw-rtk/ui';

export const CompanyItemLoading = () => {
  return (
    <Box
      alignItems={{ desktop: 'center', mobile: 'flex-start' }}
      flexDirection={{ desktop: 'row', mobile: 'column' }}
      gap="lg"
      justifyContent="space-between"
      paddingX="xl"
      paddingY="2xl"
      flex
    >
      <div>
        <Skeleton height="1.5rem" width="10rem" />
        <Skeleton
          height="1em"
          sx={{ marginTop: '2xl', marginBottom: 'xl', fontSize: 'xl' }}
          width="10rem"
        />

        <Box alignItems="center" gap="md" flex>
          <Skeleton height="1em" width="4rem" />
          <Skeleton height="1em" width="6rem" />
        </Box>
      </div>
      <Box alignItems="center" flex>
        <Skeleton height="1em" width="9rem" />
      </Box>
    </Box>
  );
};
