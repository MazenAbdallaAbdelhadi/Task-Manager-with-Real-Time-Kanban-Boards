import { z } from "zod";

export const confirmResetSchema = z.object({
  resetCode: z.string().length(6),
});
