import type { Metadata } from 'next';
import './globals.sass';

export const metadata: Metadata = {
  title: 'Alpha Dev Test',
  description: 'Next.js app with GSAP and AWS Lambda integration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
