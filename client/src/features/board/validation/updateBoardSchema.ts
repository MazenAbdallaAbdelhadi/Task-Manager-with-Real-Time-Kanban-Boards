import { z } from "zod";

export const updateBoardSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
