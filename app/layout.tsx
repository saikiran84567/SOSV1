import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppShell } from '@/shared/layouts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SOS — School Operating System',
  description:
    'A unified platform for managing school operations across admissions, academics, finance, staff, communication, and analytics.',
};

import { StoreProvider } from '@/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
