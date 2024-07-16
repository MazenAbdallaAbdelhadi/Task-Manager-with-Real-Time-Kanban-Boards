import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { updateLoggedUserPassword } from "../profileApi";

export const useUpdatePasswordService = () => {
  const queryClient = useQueryClient();
  const [, setToken] = useLocalStorage<string | null>("token", null);

  return useMutation({
    mutationFn: updateLoggedUserPassword,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      if (data) {
        setToken(data.data.token);
      }
    },
  });
};
