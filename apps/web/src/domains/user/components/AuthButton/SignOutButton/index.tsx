'use client';

import { useDialog } from '@repo/ui';

import * as s from './style.css';

interface SignOutButtonProps {
  profile: string;
}

export const SignOutButton = ({ profile }: SignOutButtonProps) => {
  const { confirm } = useDialog();

  const handleClick = async () => {
    if (await confirm('로그아웃 하시겠습니까?')) {
      location.href = '/sign-out';
    }
  };

  return (
    <img
      src={profile}
      alt="profile"
      className={s.profile}
      draggable={false}
      onClick={handleClick}
    />
  );
};
