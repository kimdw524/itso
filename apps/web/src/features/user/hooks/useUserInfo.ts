'use client';

import { useQuery } from '@tanstack/react-query';

import { UserService } from '../services';

export const useUserInfo = () => {
  const { data } = useQuery(UserService.queries.getInfo());

  return { isSignedIn: !!data, email: data?.email };
};
