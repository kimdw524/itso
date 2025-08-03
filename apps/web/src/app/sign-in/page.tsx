import { KeyRoundIcon } from 'lucide-react';

import { Typography } from '@repo/ui';

import { GoogleOAuthButton } from '@/domains/user/components/AuthButton/GoogleOAuthButton';

import * as s from './page.css';

export default async function SignInPage() {
  return (
    <div className={s.container}>
      <div className={s.icon}>
        <KeyRoundIcon />
      </div>
      <Typography fontSize="lg" sx={{ marginY: '3xl' }}>
        로그인 후 이용할 수 있어요.
      </Typography>
      <GoogleOAuthButton />
    </div>
  );
}
