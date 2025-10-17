import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { MobileTestingPanel } from '@/components/MobileTestingPanel';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'iPhone Surgeon | Precision Repair with Proof',
    template: '%s | iPhone Surgeon',
  },
  description: 'Premium iPhone repair service in Lagos. Every repair documented with before/after proof. Trusted by tech professionals.',
  keywords: [
    'iPhone repair',
    'Lagos',
    'mobile repair',
    'trusted repair',
    'proof repair',
    'iPhone screen repair',
    'iPhone battery replacement',
    'iPhone water damage',
    'professional repair',
    'tech repair Lagos',
    'iPhone repair Nigeria',
    'mobile phone repair',
    'iPhone specialist',
    'precision repair',
    'before after repair',
  ],
  authors: [{ name: 'iPhone Surgeon' }],
  creator: 'iPhone Surgeon',
  publisher: 'iPhone Surgeon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'iPhone Surgeon | Precision Repair with Proof',
    description: 'Premium iPhone repair service in Lagos. Every repair documented with before/after proof. Trusted by tech professionals.',
    siteName: 'iPhone Surgeon',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'iPhone Surgeon - Precision Repair with Proof',
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iPhone Surgeon | Precision Repair with Proof',
    description: 'Premium iPhone repair service in Lagos. Every repair documented with before/after proof. Trusted by tech professionals.',
    images: ['/images/twitter-image.webp'],
    creator: '@iphonesurgeon',
    site: '@iphonesurgeon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  category: 'Technology',
  classification: 'iPhone Repair Service',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#00D9FF' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'iPhone Surgeon',
    'application-name': 'iPhone Surgeon',
    'msapplication-TileColor': '#00D9FF',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00D9FF' },
    { media: '(prefers-color-scheme: dark)', color: '#00D9FF' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "iPhone Surgeon",
    "description": "Premium iPhone repair service in Lagos. Every repair documented with before/after proof. Trusted by tech professionals.",
    "url": "https://iphonesurgeon.com",
    "telephone": "+234-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lagos",
      "addressCountry": "Nigeria"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "6.5244",
      "longitude": "3.3792"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "6.5244",
        "longitude": "3.3792"
      },
      "geoRadius": "50000"
    },
    "priceRange": "$$",
    "image": "https://iphonesurgeon.com/images/og-image.webp",
    "logo": "https://iphonesurgeon.com/images/logo.webp",
    "sameAs": [
      "https://instagram.com/iphonesurgeon",
      "https://twitter.com/iphonesurgeon",
      "https://facebook.com/iphonesurgeon"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "iPhone Repair Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "iPhone Screen Repair",
            "description": "Professional iPhone screen replacement service"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "iPhone Battery Replacement",
            "description": "iPhone battery replacement with genuine parts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "iPhone Water Damage Repair",
            "description": "Professional water damage restoration for iPhones"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
        {children}
        {process.env.NODE_ENV === 'development' && <MobileTestingPanel />}
      </body>
    </html>
  );
}
