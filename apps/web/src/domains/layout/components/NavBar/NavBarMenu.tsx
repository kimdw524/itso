'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationItem, NavigationMenu } from '@kimdw-rtk/ui';

export const NavBarMenu = () => {
  const pathname = usePathname() ?? '';

  return (
    <NavigationMenu>
      <Link href="/post">
        <NavigationItem isSelected={pathname.startsWith('/post')}>
          채용공고
        </NavigationItem>
      </Link>
      <Link href="/company">
        <NavigationItem isSelected={pathname.startsWith('/company')}>
          기업
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
