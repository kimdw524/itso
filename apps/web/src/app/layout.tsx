import type { Metadata } from 'next';

import { NavBar } from '@/features/layout/components/NavBar';
import { AnimatedModal } from '@/shared/components/AnimatedModal';
import { Provider } from '@/shared/contexts/Provider';
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
