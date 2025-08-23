import Image from 'next/image';

import { Button } from '@repo/ui';

import GoogleLogo from '@/assets/images/google_logo.svg';

import { USER } from '../../constants/user';

export const GoogleOAuthButton = async () => {
  return (
    <a
      href={`https://accounts.google.com/o/oauth2/v2/auth?scope=email&response_type=code&access_type=offline&redirect_uri=${USER.GOOGLE_OAUTH_REDIRECT_URL}&client_id=${USER.GOOGLE_OAUTH_CLIENT_ID}`}
      draggable={false}
    >
      <Button color="secondary" icon={<Image src={GoogleLogo} alt="Google" />}>
        로그인
      </Button>
    </a>
  );
};
