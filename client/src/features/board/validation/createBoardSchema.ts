import { z } from "zod";

export const createBoardSchema = z.object({
  title: z.string().min(2, "Board title must be at least 2 characters"),
  description: z.string().optional(),
});
