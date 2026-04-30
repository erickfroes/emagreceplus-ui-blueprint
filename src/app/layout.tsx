import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EmagrecePlus UI Blueprint',
  description: 'Protótipo visual em Next.js para as 52 telas do EmagrecePlus.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
