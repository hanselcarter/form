import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthForm } from "@/components/auth/AuthForm";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm
        title="Sign in to your account"
        description="Enter your email below to sign in to your account"
        footer={{
          text: "Don&apos;t have an account?",
          linkText: "Sign up",
          href: "/signup"
        }}
        form={<LoginForm />}
      />
    </AuthLayout>
  );
}
