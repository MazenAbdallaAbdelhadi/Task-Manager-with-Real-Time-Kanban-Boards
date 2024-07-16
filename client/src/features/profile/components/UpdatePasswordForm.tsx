import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch } from "@/store/store";
import { closeModal } from "@/features/modal/modalSlice";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePasswordSchema } from "../validations/updatePasswordSchema";
import { useUpdatePasswordService } from "../services/updatePasswordService";
import { PasswordInput } from "@/features/auth/components/PasswordInput";

const UpdatePasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const { mutate, isPending, isSuccess } = useUpdatePasswordService();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
      dispatch(closeModal());
    }
  }, [isSuccess]);

  function onSubmit(values: z.infer<typeof updatePasswordSchema>) {
    mutate(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Make changes to your password here. Click save when you're done.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPasswordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password Confirm</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="*********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} className="mt-4">
              {isPending ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm;
