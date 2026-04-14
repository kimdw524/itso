import { NavBar } from '@/features/layout/components';
import { AnimatedModal } from '@/shared/components';
import '@/styles/globalStyle.css';

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main>
        {children}
        <AnimatedModal>{modal}</AnimatedModal>
      </main>
    </>
  );
}
