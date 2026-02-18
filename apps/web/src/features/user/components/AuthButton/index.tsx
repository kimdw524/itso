import { UserService } from '../../services/UserService';
import { GoogleOAuthButton } from './GoogleOAuthButton';
import { SignOutButton } from './SignOutButton';

export const AuthButton = async () => {
  const userInfo = await UserService.getInfo();

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

export * from './GoogleOAuthButton';
