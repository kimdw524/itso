'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationItem, NavigationMenu } from '@repo/ui';

export const NavBarMenu = () => {
  const pathname = usePathname() ?? '';

  return (
    <NavigationMenu>
      <NavigationItem isSelected={pathname.startsWith('/post')}>
        <Link href="/post">채용공고</Link>
      </NavigationItem>
      <NavigationItem isSelected={pathname.startsWith('/bookmark')}>
        <Link href="/bookmark">북마크</Link>
      </NavigationItem>
    </NavigationMenu>
  );
};
