import { clearUser } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { deleteLoggedUserAccount } from "../profileApi";

export const useDeleteAccountService = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: deleteLoggedUserAccount,
    onSuccess: (data) => {
      if (data) {
        dispatch(clearUser());
      }
    },
  });
};
