import type { Metadata } from 'next';

import { Provider } from '@/shared/contexts';
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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
