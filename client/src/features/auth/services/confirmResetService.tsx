import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { confirmReset } from "../authApi";

export const useConfrimResetService = () => {
  const confirmResetMutation = useMutation({
    mutationFn: confirmReset,
    onSuccess: (data) => {
      if (data?.message) toast.success(data.message);
    },
  });

  return confirmResetMutation;
};
