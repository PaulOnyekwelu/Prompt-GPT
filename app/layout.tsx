import Nav from '@/components/Nav';
import '@/styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'Prompt-GPT',
  description: 'Discover and share AI prompts',
};

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
