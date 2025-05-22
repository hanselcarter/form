"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Define validation schema with Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Get authentication functions from our custom hook
  const { login } = useAuth();

  // Form submission handler
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Call our login function from the auth hook
      await login({
        email: data.email,
        password: data.password,
      });
      // The hook handles success messages and redirects
    } catch (error) {
      // The hook handles error messages, but we can add additional handling here if needed
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="relative">
            <Input
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoCorrect="off"
              {...register("password")}
              aria-invalid={errors.password ? "true" : "false"}
              className="pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </div>
    </form>
  );
}
