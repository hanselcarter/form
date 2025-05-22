import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { MainNavigation } from "@/components/layout/MainNavigation";
import { APP_NAME } from "@/constants";
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
  description: "Create beautiful, responsive forms in minutes. Our simple form builder helps you collect data and gather feedback.",
  keywords: "forms, form builder, data collection, feedback, surveys",
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
