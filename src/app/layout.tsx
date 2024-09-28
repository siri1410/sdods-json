import React from 'react';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/layout-pages/Footer';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
