import type { Metadata } from 'next';

import { Provider } from '@/contexts/Provider';
import { NavBar } from '@/domains/layout/components/NavBar';
import '@/styles/globalStyle.css';

export const metadata: Metadata = {
  title: 'Itso',
  description: 'Itso',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Provider>
          <NavBar />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
