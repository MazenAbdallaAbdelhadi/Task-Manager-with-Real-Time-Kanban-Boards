import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { resetPasswordSchema } from "../validation/resetPasswordSchema";
import { useResetPasswordService } from "../services/resetPasswordService";
import { ResponseObject } from "@/types/responseType";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { PasswordInput } from "./PasswordInput";

const ResetPasswordForm: React.FC = () => {
  const userEmail = sessionStorage.getItem("email");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: userEmail || "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending, isSuccess } = useResetPasswordService();

  function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const promise = mutateAsync({ ...values });

    toast.promise(promise, {
      loading: "Loading...",
      error(data: AxiosError) {
        const err = (data.response?.data as ResponseObject)?.message;
        return `Error: ${err}`;
      },
      success() {
        return `success`;
      },
    });
  }

  if (isSuccess) return <Navigate to="/login" />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-[300px]"
      >
        <div className="space-y-3">
          {!userEmail && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      placeholder="user@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="new-password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirm</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="new-password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={isPending} className="mt-2 self-end">
          {isPending ? <Loader size={18} className="animate-spin" /> : "Next"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
