import { z } from "zod";

export const updateColumnSchema = z.object({
  newName: z.string().min(2, "Column new must be at least 2 characters"),
  columnId: z.string().length(24),
});
