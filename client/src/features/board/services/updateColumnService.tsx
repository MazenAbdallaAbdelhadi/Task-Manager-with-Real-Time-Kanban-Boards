import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { updateColumn } from "../boardApi";
import { updateColumnSchema } from "../validation/updateColumnSchema";
import { useSelector } from "react-redux";
import { selectSelectedBoard } from "../boardSlice";

export const useUpdateColumnService = () => {
  const selectedBoard = useSelector(selectSelectedBoard);

  const updateColumnMutation = useMutation({
    mutationFn: (data: z.infer<typeof updateColumnSchema>) =>
      updateColumn(selectedBoard?._id!, data),
  });

  return updateColumnMutation;
};
