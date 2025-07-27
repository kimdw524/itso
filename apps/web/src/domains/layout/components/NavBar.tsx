import {
  Button,
  NavigationAside,
  NavigationBar,
  NavigationItem,
  NavigationLogo,
} from '@repo/ui';

import { STYLE_VARS } from '@/styles/vars.css';

export const NavBar = () => {
  return (
    <NavigationBar size="md" style={{ height: STYLE_VARS.NAVBAR_HEIGHT }}>
      <NavigationLogo>
        {/* soft navigation을 비활성화 하기 위해 의도적으로 a태그 사용함 */}
        {/* eslint-disable-next-line */}
        <a href="/">Itso</a>
      </NavigationLogo>
      <NavigationAside>
        <NavigationItem>
          <Button>로그인</Button>
        </NavigationItem>
      </NavigationAside>
    </NavigationBar>
  );
};
