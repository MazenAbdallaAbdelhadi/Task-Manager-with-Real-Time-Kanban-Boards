import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { addColumnToBoard } from "../boardApi";
import { addColumnToBoardSchema } from "../validation/addColumnToBoardSchema";
import { useSelector } from "react-redux";
import { selectSelectedBoard } from "../boardSlice";

export const useAddColumnService = () => {
  const selectedBoard = useSelector(selectSelectedBoard);


  const addColumnMutation = useMutation({
    mutationFn: (data: z.infer<typeof addColumnToBoardSchema>) =>
      addColumnToBoard(selectedBoard?._id!, data),
  });

  return addColumnMutation;
};
