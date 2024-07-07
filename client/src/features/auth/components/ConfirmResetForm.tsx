import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { confirmResetSchema } from "../validation/confirmResetSchema";
import { useConfrimResetService } from "../services/confirmResetService";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const ConfirmResetForm: React.FC = () => {
  const form = useForm<z.infer<typeof confirmResetSchema>>({
    resolver: zodResolver(confirmResetSchema),
    defaultValues: {
      resetCode: "",
    },
    mode: "onChange",
  });

  const { mutateAsync, isPending, isSuccess } = useConfrimResetService();

  function onSubmit(values: z.infer<typeof confirmResetSchema>) {
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

  if (isSuccess) return <Navigate to="/reset-password" />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-[300px]"
      >
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Enter the OTP to reset your password
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

export default ConfirmResetForm;
