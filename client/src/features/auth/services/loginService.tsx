import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../authApi";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAppDispatch } from "@/store/store";
import { setUser } from "../authSlice";

export const useLoginService = () => {
  const queryClient = useQueryClient();
  const [, setToken] = useLocalStorage<string | null>("token", null);
  const dispatch = useAppDispatch();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["token"], data?.data?.token);

      if (data?.data) {
        setToken(data.data.token);
        dispatch(setUser({ user: data.data.user }));
      }
    },
  });

  return loginMutation;
};
