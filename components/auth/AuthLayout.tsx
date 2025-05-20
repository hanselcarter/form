import { ReactNode } from "react";
import { BookText } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex flex-1 flex-col items-center justify-center">
          <BookText className="mb-6 h-6 w-6" />
          <blockquote className="space-y-2 text-center">
            <p className="text-lg">
              &ldquo;This app has completely transformed how we handle our documentation and form processes. Everything is streamlined now.&rdquo;
            </p>
            <footer className="text-sm">Rijad Dizdarevic</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  );
}
