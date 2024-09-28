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
        <ThemeProvider>
          <LanguageProvider>
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
