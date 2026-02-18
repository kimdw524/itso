import type { Metadata } from 'next';

import { NavBar } from '@/features/layout/components';
import { AnimatedModal } from '@/shared/components';
import { Provider } from '@/shared/contexts';
import '@/styles/globalStyle.css';

export const metadata: Metadata = {
  title: 'Itso',
  description: 'Itso',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Provider>
          <NavBar />
          <main>
            {children}
            <AnimatedModal>{modal}</AnimatedModal>
          </main>
        </Provider>
      </body>
    </html>
  );
}
