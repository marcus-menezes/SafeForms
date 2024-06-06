"use client";

import SignInImage from "@/assets/images/signIn.png";
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
import { useSignIn } from "@/hooks/useSignIn";
import { ISignInRequest } from "@/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { setCookie } from "cookies-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthLayout from "@/components/layouts/authLayout";

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

const SignInPage: React.FC = () => {
  const form = useForm<ISignInRequest>({
    resolver: zodResolver(FormSchema),
  });
  const { handleSubmit, control } = form;
  const { mutate, isPending: loading } = useSignIn();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: ISignInRequest) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: async (data) => {
          const token = await data.user.getIdToken();
          setCookie("token", token);
          router.push("/home");
        },
        onError: (error) => {
          if (error.message === "Firebase: Error (auth/invalid-credential).") {
            toast({
              variant: "error",
              title: "Incorrect email or password!",
              description: "Please try again.",
            });
          } else {
            toast({
              variant: "error",
              title: "Error in sign in!",
              description: "Something went wrong. Please try again.",
            });
          }
        },
      }
    );
  };

  return (
    <AuthLayout>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-full rounded-lg max-w-lg p-8 space-y-6 shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="mb-5 text-4xl">Safe Forms</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="user@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Link
                            href="/password-reset"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Loading..." : "Sign In"}
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter>
              Don’t have an account?
              <Link href="/signup" className="underline">
                Sign Up
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="hidden bg-slate-400 bg-muted lg:block">
          <Image
            src={SignInImage}
            alt="Sign In"
            width="1920"
            height="1080"
            className="h-screen w-full object-cover"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
