import { z } from "zod";

export const addColumnToBoardSchema = z.object({
  name: z.string().min(2, "Column name must be at least 2 characters"),
});
