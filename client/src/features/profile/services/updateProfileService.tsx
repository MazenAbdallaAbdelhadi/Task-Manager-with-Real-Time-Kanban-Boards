import { useMutation } from "@tanstack/react-query";
import { updateLoggedUserProfile } from "../profileApi";
import { useAppDispatch } from "@/store/store";
import { setUser } from "@/features/auth/authSlice";

export const useUpdateProfileService = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: updateLoggedUserProfile,
    onSuccess: (data) => {
      if (data) {
        dispatch(setUser({ user: data.data }));
      }
    },
  });
};
