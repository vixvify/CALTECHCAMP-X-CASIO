import { Kanit } from 'next/font/google';
import './globals.css';
import Nav from './components/Nav';
import 'aos/dist/aos.css';
import Providers from './Provider';

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['400', '600'],
  variable: '--font-kanit',
});

export const metadata = {
  title: 'calctech camp x casio',
  description: 'calctechcampxcasio',
  keywords: ['calctechcamp', 'calctechcampxcasio', 'casio', 'calctech'],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${kanit.variable}`}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
