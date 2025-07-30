import Image from 'next/image';

import GoogleIcon from '@/assets/images/google/web_dark_rd_SI.svg';

import { USER } from '../../constants/user';

export const GoogleOAuthButton = async () => {
  return (
    <a
      href={`https://accounts.google.com/o/oauth2/v2/auth?scope=email&response_type=code&access_type=offline&redirect_uri=${USER.GOOGLE_OAUTH_REDIRECT_URL}&client_id=${USER.GOOGLE_OAUTH_CLIENT_ID}`}
      draggable={false}
    >
      <Image src={GoogleIcon} alt="Sign in with Google" draggable={false} />
    </a>
  );
};
