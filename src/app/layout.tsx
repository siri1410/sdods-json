import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/layout-pages/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevToolBox',
  description: 'This is a collection of tools to help with development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
