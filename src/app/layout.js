import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Add weights you need
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata = {
  title: 'WeatherApp',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}

