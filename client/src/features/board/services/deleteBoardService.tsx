import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoardById } from "../boardApi";
import { useSelector } from "react-redux";
import { selectSelectedBoard } from "../boardSlice";

export const useDeleteBoardService = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const queryClient = useQueryClient();

  const deleteBoardMutation = useMutation({
    mutationFn: () => deleteBoardById(selectedBoard?._id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  return deleteBoardMutation;
};
