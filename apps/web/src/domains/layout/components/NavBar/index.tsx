import Link from 'next/link';

import {
  NavigationAside,
  NavigationBar,
  NavigationContainer,
  NavigationDrawer,
  NavigationLogo,
} from '@repo/ui';

import { AuthButton } from '@/domains/user/components/AuthButton';
import { STYLE_VARS } from '@/styles/vars.css';

import { Logo } from '../Logo';
import { ThemeToggleButton } from '../ThemeToggleButton';
import { NavBarMenu } from './NavBarMenu';

export const NavBar = () => {
  return (
    <NavigationBar size="md" style={{ height: STYLE_VARS.NAVBAR_HEIGHT }}>
      <NavigationContainer
        sx={{ paddingX: { desktop: '2xl', mobile: 'xl' } }}
        style={{ maxWidth: STYLE_VARS.CONTAINER_WIDTH }}
      >
        <NavigationLogo>
          <Link href="/" aria-label="Navigate to Home">
            <Logo height="1.25em" />
          </Link>
        </NavigationLogo>
        <NavigationDrawer
          menu={<NavBarMenu />}
          aside={
            <NavigationAside>
              <ThemeToggleButton />
              <AuthButton />
            </NavigationAside>
          }
        />
      </NavigationContainer>
    </NavigationBar>
  );
};
