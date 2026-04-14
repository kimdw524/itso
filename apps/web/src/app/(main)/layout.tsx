import { NavBar } from '@/features/layout/components';
import { AnimatedModal } from '@/shared/components';
import '@/styles/globalStyle.css';

import { Provider } from './_components/Provider';

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <Provider>
      <NavBar />
      <main>
        {children}
        <AnimatedModal>{modal}</AnimatedModal>
      </main>
    </Provider>
  );
}
