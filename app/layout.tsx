import type {Metadata} from 'next';
import {Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Play Console Publishing Overview',
  description:
    'Exact interactive replica of the Google Play Console Publishing Overview interface showing changes in review across Production, Open testing, and Closed testing tracks.',
  openGraph: {
    title: 'Play Console Publishing Overview',
    description:
      'Exact interactive replica of the Google Play Console Publishing Overview interface showing changes in review across Production, Open testing, and Closed testing tracks.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Play Console Publishing Overview',
    description:
      'Exact interactive replica of the Google Play Console Publishing Overview interface showing changes in review across Production, Open testing, and Closed testing tracks.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-white text-[#202124] selection:bg-[#e8f0fe] selection:text-[#1967d2]"
      >
        {children}
      </body>
    </html>
  );
}
