'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
    
    // Show a toast notification
    toast.error('Something went wrong');
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="mb-6 text-gray-600 max-w-md">
        We apologize for the inconvenience. The application encountered an unexpected error.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
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
  );
}
