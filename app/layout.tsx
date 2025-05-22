import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { APP_NAME, AUTHOR_NAME } from "@/constants";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_NAME} - Create Beautiful Forms in Minutes`,
  description: "Create beautiful, responsive forms in minutes. Our simple form builder helps you collect data and gather feedback without any coding required.",
  keywords: "forms, form builder, data collection, feedback, surveys, online forms, form templates, drag and drop",
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  publisher: APP_NAME,
  metadataBase: new URL('https://dhpbb0hg9mvh1.cloudfront.net'),
  alternates: {
    canonical: '/',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dhpbb0hg9mvh1.cloudfront.net',
    title: `${APP_NAME} - Create Beautiful Forms in Minutes`,
    description: "Create beautiful, responsive forms in minutes. Our simple form builder helps you collect data and gather feedback without any coding required.",
    siteName: APP_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} - Create Beautiful Forms in Minutes`,
    description: "Create beautiful, responsive forms in minutes. Our simple form builder helps you collect data and gather feedback without any coding required.",
    creator: `@${AUTHOR_NAME.replace(' ', '')}`
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <AuthProvider>
            <MainNavigation />
            {children}
          </AuthProvider>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
