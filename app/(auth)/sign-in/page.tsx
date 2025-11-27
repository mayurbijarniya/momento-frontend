"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const router = useRouter();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        return toast({ 
          title: "Sign-In failed", 
          description: "Invalid credentials. Please check your email/username and password.",
          variant: "destructive"
        });
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        router.push("/");
      } else {
        toast({ 
          title: "Sign-In failed", 
          description: "Unable to verify your session. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          "Invalid email/username or password. Please try again.";
      
      toast({
        title: "Sign-In failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col max-sm:w-[300px] max-sm:p-5">
        <Link href="/" className="mb-2">
          <img src="/assets/images/logo.svg" className="h-20 w-auto" />
        </Link>
        <h2 className="h3-bold md:h2-bold pt-2 pb-1">Log In to account.</h2>
        <p className="text-slate-400 small-regular mt-1 mb-3">
          Welcome Back! enter your account details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Enter email or username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-white text-black font-bold mt-1 hover:bg-gray-300 h-10"
          >
            {isSigningIn ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign-In"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-3">
            Dont have an account?
            <Link
              href="/sign-up"
              className="text-white body-bold underline text-small-semibold ml-1"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
