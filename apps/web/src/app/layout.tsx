import type { Metadata } from 'next';

import { UIProvider } from '@repo/ui';

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
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
