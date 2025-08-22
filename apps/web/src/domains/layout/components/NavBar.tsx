import Link from 'next/link';

import {
  NavigationAside,
  NavigationBar,
  NavigationDrawer,
  NavigationItem,
  NavigationLogo,
  NavigationMenu,
} from '@repo/ui';

import { AuthButton } from '@/domains/user/components/AuthButton';
import { STYLE_VARS } from '@/styles/vars.css';

import { ThemeToggleButton } from './ThemeToggleButton';

export const NavBar = async () => {
  return (
    <NavigationBar size="md" style={{ height: STYLE_VARS.NAVBAR_HEIGHT }}>
      <NavigationLogo>
        <Link href="/">Itso</Link>
      </NavigationLogo>
      <NavigationDrawer>
        <NavigationMenu>
          <NavigationItem>
            <Link href="/">채용공고</Link>
          </NavigationItem>
          <NavigationItem>
            <Link href="/bookmark">북마크</Link>
          </NavigationItem>
        </NavigationMenu>
        <NavigationAside>
          <div>
            <ThemeToggleButton />
          </div>
          <div>
            <AuthButton />
          </div>
        </NavigationAside>
      </NavigationDrawer>
    </NavigationBar>
  );
};
