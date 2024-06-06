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
import { useSignUp } from "@/hooks/useSignUp";
import { ISignUpRequest } from "@/models/auth";
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
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
});

const SignUpPage: React.FC = () => {
  const form = useForm<ISignUpRequest>({
    resolver: zodResolver(FormSchema),
  });
  const { handleSubmit, control } = form;
  const { mutate, isPending: loading } = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: ISignUpRequest) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => router.push("/signin"),
        onError: (error) => {
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            toast({
              variant: "error",
              title: "User already exists!",
              description: "Please sign in instead.",
            });
          } else {
            toast({
              variant: "error",
              title: "Error in sign up!",
              description: "Something went wrong. Please try again.",
            });
          }
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-muted-foreground">
              Create an account to get started
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link href="/signin" className="underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
