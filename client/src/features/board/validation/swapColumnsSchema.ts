import { z } from "zod";

export const swapColumnsSchema = z.object({
  columnId1: z.string().length(24),
  columnId2: z.string().length(24),
});
