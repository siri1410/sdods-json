import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/layout-home/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dev ToolBox',
  description: 'One place for all your developer needs',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-500 text-white p-2">
          Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <Navigation />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
