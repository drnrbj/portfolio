import './globals.css';

export const metadata = {
  title: 'Dranreb Jay Arzadon | Portfolio',
  description: 'Computer Science Student & Aspiring Software Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-void text-white antialiased">
        <div style={{ position: 'relative', overflowX: 'hidden' }}>
          {children}
        </div>
      </body>
    </html>
  );
}