import Link from 'next/link';

import {
  NavigationAside,
  NavigationBar,
  NavigationContainer,
  NavigationDrawer,
  NavigationLogo,
} from '@kimdw-rtk/ui';

import { AuthButton } from '@/features/user/components/AuthButton';
import { STYLE_VARS } from '@/styles/vars.css';

import { Logo } from '../Logo';
import { ThemeToggleButton } from '../ThemeToggleButton';
import { NavBarMenu } from './NavBarMenu';

export const NavBar = () => {
  return (
    <NavigationBar size="md" style={{ height: STYLE_VARS.NAVBAR_HEIGHT }}>
      <NavigationContainer
        style={{ maxWidth: STYLE_VARS.CONTAINER_WIDTH }}
        sx={{ paddingX: { desktop: '2xl', mobile: 'xl' } }}
      >
        <NavigationLogo>
          <Link aria-label="Navigate to Home" href="/">
            <Logo height="1.25em" />
          </Link>
        </NavigationLogo>
        <NavigationDrawer
          aside={
            <NavigationAside>
              <ThemeToggleButton />
              <AuthButton />
            </NavigationAside>
          }
          menu={<NavBarMenu />}
        />
      </NavigationContainer>
    </NavigationBar>
  );
};
