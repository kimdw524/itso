import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@kimdw-rtk/ui';

import GoogleLogo from '@/assets/images/google_logo.svg';

import { USER } from '../../constants';

export const SignInButton = () => {
  return (
    <Link
      draggable={false}
      href={`https://accounts.google.com/o/oauth2/v2/auth?scope=email&response_type=code&access_type=offline&redirect_uri=${USER.GOOGLE_OAUTH_REDIRECT_URL}&client_id=${USER.GOOGLE_OAUTH_CLIENT_ID}`}
    >
      <Button
        color="secondary"
        fontSize="md"
        icon={<Image alt="Google" src={GoogleLogo} />}
        size="xl"
        sx={{ gap: 'lg' }}
        variant="contained"
      >
        Google 계정으로 로그인
      </Button>
    </Link>
  );
};
