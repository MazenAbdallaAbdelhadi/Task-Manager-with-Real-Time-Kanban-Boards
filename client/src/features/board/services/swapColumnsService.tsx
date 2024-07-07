import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { swapColumns } from "../boardApi";
import { swapColumnsSchema } from "../validation/swapColumnsSchema";
import { selectSelectedBoard, swapCols } from "../boardSlice";

export const useSwapColumnsService = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const dispatch = useDispatch();

  const swapColumnsMutation = useMutation({
    mutationFn: (data: z.infer<typeof swapColumnsSchema>) =>
      swapColumns(selectedBoard?._id!, data),
    onSuccess: (data) => {
      dispatch(
        swapCols({ column1: data.data.columnId1, column2: data.data.columnId2 })
      );
    },
  });

  return swapColumnsMutation;
};
