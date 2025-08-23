import Link from 'next/link';

import {
  NavigationAside,
  NavigationBar,
  NavigationContainer,
  NavigationDrawer,
  NavigationItem,
  NavigationLogo,
  NavigationMenu,
} from '@repo/ui';

import { AuthButton } from '@/domains/user/components/AuthButton';
import { STYLE_VARS } from '@/styles/vars.css';

import { Logo } from '../Logo';
import { ThemeToggleButton } from '../ThemeToggleButton';

export const NavBar = () => {
  return (
    <NavigationBar size="md" style={{ height: STYLE_VARS.NAVBAR_HEIGHT }}>
      <NavigationContainer
        sx={{ paddingX: { desktop: '2xl', mobile: 'xl' } }}
        style={{ maxWidth: STYLE_VARS.CONTAINER_WIDTH }}
      >
        <NavigationLogo>
          <Link href="/">
            <Logo height="1.25em" />
          </Link>
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
      </NavigationContainer>
    </NavigationBar>
  );
};
