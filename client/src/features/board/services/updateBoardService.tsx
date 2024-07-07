import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateBoard } from "../boardApi";
import { updateBoardSchema } from "../validation/updateBoardSchema";
import { useSelector } from "react-redux";
import { selectSelectedBoard } from "../boardSlice";

export const useUpdatedBoardService = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const queryClient = useQueryClient();

  const updateBoardMutation = useMutation({
    mutationFn: (data: z.infer<typeof updateBoardSchema>) =>
      updateBoard(selectedBoard?._id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  return updateBoardMutation;
};
