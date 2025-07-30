import { fetchUserInfo } from '@/api/user/fetchUserInfo.server';

import { GoogleOAuthButton } from './GoogleOAuthButton';
import { SignOutButton } from './SignOutButton';

export const AuthButton = async () => {
  const { email, picture } = await fetchUserInfo();

  return (
    <>
      {email === null ? (
        <GoogleOAuthButton />
      ) : (
        <SignOutButton picture={picture} />
      )}
    </>
  );
};
