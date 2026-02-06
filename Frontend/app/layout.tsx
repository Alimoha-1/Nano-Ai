import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nano NGU AI Assistant - Ethical Hacking & Cybersecurity',
  description: 'Your intelligent assistant for ethical hacking, penetration testing, and cybersecurity guidance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* Main Content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Global Footer */}
          <footer className="text-center py-2 text-xs border-t border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur">
  Nano NGU AI © {new Date().getFullYear()} – Created by <span className="font-semibold">Ali Seeraj</span>. All Rights Reserved.
</footer>


        </ThemeProvider>
      </body>
    </html>
  );
}
