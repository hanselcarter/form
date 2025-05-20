import Link from "next/link";
import { ReactNode } from "react";

interface AuthFormProps {
  title: string;
  description: string;
  footer: {
    text: string;
    linkText: string;
    href: string;
  };
  form: ReactNode;
}

export function AuthForm({ title, description, footer, form }: AuthFormProps) {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-6">
        {form}
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
      <p className="px-8 text-center text-sm text-muted-foreground">
        {footer.text}{' '}
        <Link href={footer.href} className="underline underline-offset-4 hover:text-primary">
          {footer.linkText}
        </Link>
      </p>
    </>
  );
}
