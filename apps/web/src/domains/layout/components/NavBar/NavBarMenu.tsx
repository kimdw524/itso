'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationItem, NavigationMenu } from '@repo/ui';

export const NavBarMenu = () => {
  const pathname = usePathname() ?? '';

  return (
    <NavigationMenu>
      <Link href="/post">
        <NavigationItem isSelected={pathname.startsWith('/post')}>
          채용공고
        </NavigationItem>
      </Link>
      <Link href="/bookmark">
        <NavigationItem isSelected={pathname.startsWith('/bookmark')}>
          북마크
        </NavigationItem>
      </Link>
    </NavigationMenu>
  );
};
