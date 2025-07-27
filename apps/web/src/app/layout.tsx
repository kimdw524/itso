import type { Metadata } from 'next';

import { AnimatedModal } from '@/components/AnimatedModal';
import { Provider } from '@/contexts/Provider';
import { NavBar } from '@/domains/layout/components/NavBar';
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
      <body className="dark">
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
