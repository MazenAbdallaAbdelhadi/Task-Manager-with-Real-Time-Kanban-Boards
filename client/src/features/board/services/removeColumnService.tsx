import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { removeColumn } from "../boardApi";
import { deleteColumnSchema } from "../validation/removeColumnSchema";
import { useSelector } from "react-redux";
import { selectSelectedBoard } from "../boardSlice";

export const useRemoveColumnsService = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const queryClient = useQueryClient();

  const removeColumnMutation = useMutation({
    mutationFn: (data: z.infer<typeof deleteColumnSchema>) =>
      removeColumn(selectedBoard?._id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boards", selectedBoard?._id],
      });
    },
  });

  return removeColumnMutation;
};
