import {
  NavigationAside,
  NavigationBar,
  NavigationItem,
  NavigationLogo,
  NavigationMenu,
} from '#components';

import { uiTest } from '../../tests/uiTest';
import { NavigationContainer } from './NavigationContainer';

describe('Navigation 컴포넌트', () => {
  uiTest(NavigationAside, 'NavigationAside');
  uiTest(NavigationBar, 'NavigationBar');
  uiTest(NavigationItem, 'NavigationItem');
  uiTest(NavigationLogo, 'NavigationLogo');
  uiTest(NavigationMenu, 'NavigationMenu');
  uiTest(NavigationContainer, 'NavigationContainer');
});
