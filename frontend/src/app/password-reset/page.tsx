"use client";

import AuthLayout from "@/components/layouts/authLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { usePasswordReset } from "@/hooks/usePasswordReset";
import { IPasswordResetRequest } from "@/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email({ message: "Invalid email address" }),
});

const ForgotPasswordPage: React.FC = () => {
  const form = useForm<IPasswordResetRequest>({
    resolver: zodResolver(FormSchema),
  });
  const { handleSubmit, control } = form;
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isPending: loading } = usePasswordReset();

  const onSubmit = async (data: IPasswordResetRequest) => {
    mutate(
      {
        email: data.email,
      },
      {
        onSuccess: () => router.push("/signin"),
        onError: () =>
          toast({
            variant: "error",
            title: "Error!",
            description: "Something went wrong. Please try again.",
          }),
      }
    );
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Password Reset</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email below and we´ll send you instructions to reset
              your password.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Send Reset Instructions"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Remember your password?
            <Link href="/signin" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
