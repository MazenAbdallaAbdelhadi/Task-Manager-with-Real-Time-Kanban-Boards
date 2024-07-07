import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { ResponseObject } from "@/types/responseType";

import { loginSchema } from "../validation/loginSchema";
import { PasswordInput } from "./PasswordInput";
import { useLoginService } from "../services/loginService";
import { cn } from "@/lib/utils";

const LoginForm: React.FC = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending, isSuccess } = useLoginService();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const promise = mutateAsync(values);

    toast.promise(promise, {
      loading: "Loading...",
      error(data: AxiosError) {
        const err = (data.response?.data as ResponseObject)?.message;
        return `Error: ${err}`;
      },
      success(data) {
        return `Welcome back ${data?.data.user.name}`;
      },
    });
  }

  if (isSuccess) return <Navigate to="/" />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px]">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoComplete="email" placeholder="shadcn" {...field} />
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
                  <PasswordInput
                    autoComplete="current-password"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Link
            to="/forget-password"
            className={cn(buttonVariants({ variant: "link" }), "self-end")}
          >
            Forget password?
          </Link>

          <Button disabled={isPending} className="mt-2">
            {isPending ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>

          <p className="text-sm">
            Doesn't have an account?
            <Link
              to="/register"
              className={cn(buttonVariants({ variant: "link" }))}
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
