"use client";

import Link from "next/link";
import TestimonialsSection from "@/components/marketing/TestimonialsSection";
import { APP_NAME } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Create Beautiful Forms{" "}
                <span className="text-primary">in Minutes</span>
              </h1>
              <p className="text-xl text-slate-600 max-w-[700px]">
                Our simple form builder helps you collect data, gather feedback,
                and connect with your audience without any coding required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {isAuthenticated ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      href="/login"
                      className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Log In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Powerful Features, Simple Interface
              </h2>
              <p className="text-lg text-slate-600 max-w-[700px]">
                Everything you need to create professional forms without the
                complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Drag & Drop Builder
                </h3>
                <p className="text-slate-600">
                  Create forms visually with our intuitive drag and drop
                  interface.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
                    <path d="M21.18 8.02A10 10 0 0 0 12 2v10h10a10.01 10.01 0 0 0-.82-3.98z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Real-time Analytics
                </h3>
                <p className="text-slate-600">
                  Monitor responses and analyze data with powerful built-in
                  tools.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Responsive Design
                </h3>
                <p className="text-slate-600">
                  Forms look great on any device, from desktops to smartphones.
                </p>
              </div>
            </div>
          </div>
        </section>
        <TestimonialsSection />
        <section className="w-full py-12 md:py-24 bg-primary text-white">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 max-w-[600px]">
                Join thousands of users who are already creating beautiful forms
                with {APP_NAME}.
              </p>
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-medium text-primary shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-base font-medium text-primary shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Create Your Free Account
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 bg-white">
        <div className="container px-4 md:px-6 mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                href="/"
                className="text-sm text-slate-500 hover:text-primary"
              >
                Terms
              </Link>
              <Link
                href="/"
                className="text-sm text-slate-500 hover:text-primary"
              >
                Privacy
              </Link>
              <Link
                href="/"
                className="text-sm text-slate-500 hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
