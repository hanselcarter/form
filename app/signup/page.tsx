import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthForm } from "@/components/auth/AuthForm";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthForm
        title="Create an account"
        description="Enter your details below to create your account"
        footer={{
          text: "Already have an account?",
          linkText: "Sign in",
          href: "/login"
        }}
        form={<SignupForm />}
      />
    </AuthLayout>
  );
}
