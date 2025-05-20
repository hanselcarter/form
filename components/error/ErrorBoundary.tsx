"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  toastShown: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, toastShown: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, toastShown: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  componentDidUpdate(): void {
    if (this.state.hasError && !this.state.toastShown) {
      toast.error("An unexpected error occurred");
      this.setState({ toastShown: true });
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-6 text-gray-600 max-w-md">
              We apologize for the inconvenience. The application encountered an
              unexpected error.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  this.setState({ hasError: false, toastShown: false })
                }
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
              >
                Try again
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90 transition"
              >
                Go to homepage
              </Link>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
