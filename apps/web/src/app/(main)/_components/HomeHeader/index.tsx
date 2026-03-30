import { Animated } from '@kimdw-rtk/animation';
import { Box, Typography } from '@kimdw-rtk/ui';

import { SearchField } from '@/features/search/components';

interface HomeHeaderProps {
  searchKeywords: string[];
}

export const HomeHeader = ({ searchKeywords }: HomeHeaderProps) => {
  return (
    <Box padding="2xl" style={{ isolation: 'isolate', zIndex: 10 }}>
      <Typography
        fontWeight="medium"
        lineHeight="md"
        sx={{ fontSize: { mobile: 'xl', desktop: '2xl' } }}
        textAlign="center"
      >
        <Animated.Text
          animate={{ opacity: 1, transform: 'translateY(0)' }}
          duration={1000}
          initial={{ opacity: 0, transform: 'translateY(50%)' }}
        >
          IT 직군 채용공고를 가장 빠르게 확인하세요.
        </Animated.Text>
      </Typography>
      <SearchField keywords={searchKeywords} />
    </Box>
  );
};
