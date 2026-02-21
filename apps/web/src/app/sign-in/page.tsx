import { Animated } from '@kimdw-rtk/animation';
import { Box, Flex, Typography } from '@kimdw-rtk/ui';
import { MehIcon } from 'lucide-react';

import { HomeButton, SignInButton } from '@/features/user/components';

import * as s from './page.css';

export default async function SignInPage() {
  return (
    <Animated.Single
      animate={{ opacity: '1', transform: 'scale(1)' }}
      duration={500}
      initial={{ opacity: '0', transform: 'scale(0.85)' }}
    >
      <Box className={s.container} padding="lg">
        <div className={s.icon}>
          <MehIcon size="4rem" />
        </div>

        <Typography
          fontSize="xl"
          lineHeight="md"
          sx={{ marginY: '3xl' }}
          textAlign="center"
          wordBreak="break-word"
        >
          <Animated.Text
            animate={{ opacity: '1' }}
            duration={750}
            initial={{ opacity: '0' }}
            unit="word"
          >
            로그인 후 모든 서비스를 이용할 수 있어요.
          </Animated.Text>
        </Typography>
        <Flex flexWrap="wrap-reverse" gap="md" justifyContent="center">
          <HomeButton />
          <SignInButton />
        </Flex>
      </Box>
    </Animated.Single>
  );
}
