'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  const router = useRouter();

  useEffect(() => {
    if (error instanceof Response && error.status === 401) {
      router.replace('/sign-in');
      return;
    }

    router.replace('/');
  }, [router, error]);

  return null;
}
