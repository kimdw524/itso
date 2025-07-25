'use client';

import Link from 'next/link';

import {
  Button,
  NavigationAside,
  NavigationBar,
  NavigationItem,
  NavigationLogo,
} from '@repo/ui';

export const NavBar = () => {
  return (
    <NavigationBar size="sm">
      <NavigationLogo>
        <Link href="/">Itso</Link>
      </NavigationLogo>
      <NavigationAside>
        <NavigationItem>
          <Button size="sm">로그인</Button>
        </NavigationItem>
      </NavigationAside>
    </NavigationBar>
  );
};
