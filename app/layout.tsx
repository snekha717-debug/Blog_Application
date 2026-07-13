import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Modern Blog',
  description: 'A blazing fast, SSR-enabled blog built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <Providers>
          <header className="bg-white shadow-sm sticky top-0 z-10">
            <nav className="max-w-5xl mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold tracking-tight text-blue-600">BlogSpace</h1>
            </nav>
          </header>
          <main className="max-w-5xl mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}