import type { Metadata } from 'next';

import { Provider } from '@/components/Provider';
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
      <body className="light">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
