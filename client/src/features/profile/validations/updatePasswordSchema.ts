import { z } from "zod";

export const updatePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8),
  newPasswordConfirm: z.string().min(8),
});
