import { fetchUserInfo } from '@/api/user/fetchUserInfo.server';

import { GoogleOAuthButton } from './GoogleOAuthButton';
import { SignOutButton } from './SignOutButton';

export const AuthButton = async () => {
  const userInfo = await fetchUserInfo();
  return (
    <>
      {userInfo === null ? (
        <GoogleOAuthButton />
      ) : (
        <SignOutButton profile={userInfo.profile} />
      )}
    </>
  );
};
