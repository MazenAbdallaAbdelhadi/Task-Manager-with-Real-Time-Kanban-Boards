import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../authApi";
import useLocalStorage from "../hooks/useLocalStorage";

export const useRegisterService = () => {
  const queryClient = useQueryClient();
  const [, setToken] = useLocalStorage<string | null>("token", null);

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      queryClient.setQueryData(["token"], data?.data?.token);

      if (data?.data.token) setToken(data?.data?.token);
    },
  });

  return registerMutation;
};
