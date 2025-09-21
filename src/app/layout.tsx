'use client';

import { Kanit } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import 'aos/dist/aos.css';
import { SessionProvider } from 'next-auth/react';

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '600'],
  variable: '--font-kanit',
});

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={`${kanit.variable}`}>
        <SessionProvider>
          <Nav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
