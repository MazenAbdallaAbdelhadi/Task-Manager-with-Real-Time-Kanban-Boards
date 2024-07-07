import React from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { forgetPasswordSchema } from "../validation/forgetPasswordSchema";
import { useForgetPasswordService } from "../services/forgetPasswordService";
import { ResponseObject } from "@/types/responseType";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const ForgetPasswordForm: React.FC = () => {
  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending, isSuccess } = useForgetPasswordService();

  function onSubmit(values: z.infer<typeof forgetPasswordSchema>) {
    // set email in session storage to use it in reset password request
    sessionStorage.setItem("email", values.email);
    const promise = mutateAsync(values);

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

  if (isSuccess) return <Navigate to="/confirm-reset" />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-[300px]"
      >
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
                <FormDescription>
                  Enter the email address associated with your account and we
                  'll send you OTP to reset your password
                </FormDescription>
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

export default ForgetPasswordForm;
