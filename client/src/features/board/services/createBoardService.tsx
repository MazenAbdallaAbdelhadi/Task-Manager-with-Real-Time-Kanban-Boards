import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoard } from "../boardApi";

export const useCreateBoardService = () => {
  const queryClient = useQueryClient();

  const createBoardMutation = useMutation({
    mutationFn: createBoard,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey: ["boards"]})
    }
  });

  return createBoardMutation;
};
