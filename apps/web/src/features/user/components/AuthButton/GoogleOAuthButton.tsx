import Image from 'next/image';

import { Button } from '@kimdw-rtk/ui';

import GoogleLogo from '@/assets/images/google_logo.svg';

import { USER } from '../../constants';

export const GoogleOAuthButton = async () => {
  return (
    <a
      draggable={false}
      href={`https://accounts.google.com/o/oauth2/v2/auth?scope=email&response_type=code&access_type=offline&redirect_uri=${USER.GOOGLE_OAUTH_REDIRECT_URL}&client_id=${USER.GOOGLE_OAUTH_CLIENT_ID}`}
    >
      <Button color="secondary" icon={<Image alt="Google" src={GoogleLogo} />}>
        로그인
      </Button>
    </a>
  );
};
