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

import { registerSchema } from "../validation/registerSchema";
import { useRegisterService } from "../services/registerService";
import { PasswordInput } from "./PasswordInput";
import ImageUpload from "./ImageUpload";

const RegisterForm: React.FC = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profileImage: undefined,
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending, isSuccess } = useRegisterService();

  function onSubmit(values: z.infer<typeof registerSchema>) {
    const promise = mutateAsync(values);

    toast.promise(promise, {
      loading: "Loading...",
      error(data: AxiosError) {
        const err = (data.response?.data as ResponseObject)?.message;
        return err;
      },
      success(data) {
        return `Welcome back ${data?.data.user.name}`;
      },
    });
  }

  if (isSuccess) return <Navigate to="/" />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[300px]"
      >
        <div className="space-y-3">
          <ImageUpload />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="shadcn" {...field} />
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

        <div>
          <Button disabled={isPending}>
            {isPending ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              "Register"
            )}
          </Button>

          <p className="text-sm">
            Already have Account?{" "}
            <Link to="/login" className={buttonVariants({ variant: "link" })}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
