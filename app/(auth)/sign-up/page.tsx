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
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const router = useRouter();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    try {
      const newUser = await createUserAccount(values);
      if (!newUser) {
        return toast({
          title: "Sign-Up failed",
          description: "Unable to create account. Please try again.",
          variant: "destructive",
        });
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        return toast({
          title: "Sign-In failed",
          description:
            "Account created but unable to sign in. Please try logging in.",
          variant: "destructive",
        });
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        router.push("/");
      } else {
        toast({
          title: "Sign-up failed",
          description: "Unable to verify your session. Please try logging in.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to create account. Please try again.";

      let description = errorMessage;
      if (
        errorMessage.toLowerCase().includes("email") ||
        errorMessage.toLowerCase().includes("username")
      ) {
        if (errorMessage.toLowerCase().includes("email")) {
          description =
            "This email is already registered. Please use a different email or try logging in.";
        } else if (errorMessage.toLowerCase().includes("username")) {
          description =
            "This username is already taken. Please choose a different username.";
        }
      }

      toast({
        title: "Sign-Up failed",
        description: description,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col max-sm:w-[300px] max-sm:p-5">
        <Link href="/" className="mb-2 flex items-center gap-3 justify-center">
          <img
            src="/assets/images/lg-logo.svg"
            alt="Momento"
            className="w-12 h-12"
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight">
              Momento
            </h1>
            <p className="text-[9px] font-normal text-light-3 tracking-wider uppercase leading-tight mt-0.5">
              CAPTURE EVERY MOMENT
            </p>
          </div>
        </Link>
        <h2 className="h3-bold md:h2-bold pt-2 pb-1">Create a new account.</h2>
        <p className="text-slate-400 small-regular mt-1 mb-3">
          To use Momento enter your account details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-3">Account Type</FormLabel>
                <FormControl>
                  <select {...field} className="shad-input text-white w-full">
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </FormControl>
                <p className="text-xs text-light-3 mt-1">
                  Choose your account type. Admin accounts have additional
                  permissions.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-white text-black font-bold mt-1 hover:bg-gray-300 h-10"
          >
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-3">
            Already have an account?
            <Link
              href="/sign-in"
              className="text-white body-bold underline text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
