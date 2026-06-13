import './globals.css';

export const metadata = {
  title: 'Dranreb Jay Arzadon | CS Student & Software Developer',
  description:
    'Portfolio of Dranreb Jay Arzadon — Computer Science student, aspiring software developer, and web developer based in the Philippines.',
  icons: {
    icon: '/images/logos.png',
  },
  keywords: [
    'portfolio',
    'software developer',
    'web developer',
    'computer science',
    'Philippines',
    'OJT',
    'internship',
  ],
  authors: [{ name: 'Dranreb Jay Arzadon' }],
  creator: 'Dranreb Jay Arzadon',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dranrebjay.vercel.app',
    title: 'Dranreb Jay Arzadon | Portfolio',
    description: 'CS Student & Aspiring Software Developer',
    siteName: 'Dranreb Jay Arzadon Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dranreb Jay Arzadon | Portfolio',
    description: 'CS Student & Aspiring Software Developer',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-void text-white antialiased">
        <div style={{ position: 'relative', overflowX: 'hidden' }}>{children}</div>
      </body>
    </html>
  );
}