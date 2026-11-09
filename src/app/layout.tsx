import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

export const metadata: Metadata = {
  title: 'NEXUS.3D — Next-Gen 3D Animated Project Showcase & Engineering Hub',
  description: 'An interactive 3D WebGL showroom engineered to feature cutting-edge open-source software, high-performance web applications, and experimental graphics pipelines.',
  keywords: ['3D WebGL', 'Three.js', 'Next.js', 'Project Showcase', 'Engineering Portfolio', 'GDPR', 'CCPA', 'Data Erasure'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

