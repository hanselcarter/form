import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-6 text-gray-600 max-w-md">
        The page you are looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link 
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
      >
        Return to Home
      </Link>
    </div>
  );
}
