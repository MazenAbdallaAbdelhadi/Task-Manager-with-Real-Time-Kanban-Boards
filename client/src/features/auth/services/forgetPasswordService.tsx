import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgetPassword } from "../authApi";

export const useForgetPasswordService = () => {
  const forgetPasswordMutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      if (data?.message) toast.success(data.message);
    },
  });

  return forgetPasswordMutation;
};
