'use client';

import { useDialog } from '@repo/ui';

import * as s from './style.css';

interface SignOutButtonProps {
  picture: string;
}

export const SignOutButton = ({ picture }: SignOutButtonProps) => {
  const { confirm } = useDialog();

  const handleClick = async () => {
    if (await confirm('로그아웃 하시겠습니까?')) {
      location.href = '/sign-out';
    }
  };

  return (
    <img
      src={picture}
      alt="profile"
      className={s.picture}
      draggable={false}
      onClick={handleClick}
    />
  );
};
