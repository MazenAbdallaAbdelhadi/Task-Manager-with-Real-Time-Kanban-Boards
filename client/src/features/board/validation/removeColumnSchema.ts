import { z } from "zod";

export const deleteColumnSchema = z.object({
  columnId: z.string().length(24),
});
