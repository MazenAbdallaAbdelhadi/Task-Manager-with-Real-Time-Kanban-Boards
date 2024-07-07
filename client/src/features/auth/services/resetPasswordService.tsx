import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetPassword } from "../authApi";

export const useResetPasswordService = () => {
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      if (data?.message) toast.success(data.message);
    },
  });

  return resetPasswordMutation;
};
