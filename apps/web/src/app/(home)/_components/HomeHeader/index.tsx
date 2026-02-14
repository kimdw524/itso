import { Animated } from '@kimdw-rtk/animation';
import { Box, Typography } from '@kimdw-rtk/ui';

import { SearchField } from '@/features/search/components';

export const HomeHeader = () => {
  // TODO: Animated.Single props가 사라지는 문제가 해결되면 이 부분의 코드를 다시 작성해야 됨.
  return (
    <div style={{ isolation: 'isolate', zIndex: 10 }}>
      <Animated.Box
        initial={{ transform: 'scale(0.9)', opacity: 0 }}
        animate={{ transform: 'scale(1)', opacity: 1 }}
        duration={500}
      >
        <Box paddingX="lg" paddingY="2xl">
          <Typography
            fontWeight="medium"
            textAlign="center"
            lineHeight="md"
            sx={{ fontSize: { mobile: 'xl', desktop: '2xl' } }}
          >
            <Animated.Text
              initial={{ opacity: 0, transform: 'translateY(50%)' }}
              animate={{ opacity: 1, transform: 'translateY(0)' }}
              duration={1000}
            >
              IT 직군 채용공고를 가장 빠르게 확인하세요.
            </Animated.Text>
          </Typography>
          <SearchField />
        </Box>
      </Animated.Box>
    </div>
  );
};
