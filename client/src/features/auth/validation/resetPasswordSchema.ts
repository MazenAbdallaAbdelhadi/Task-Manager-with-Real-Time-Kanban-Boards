import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string(),
  })
  .refine((arg) => arg.password === arg.passwordConfirm, {
    message: "Passwords doesn't match",
    path: ["passwordConfirm"],
  });
