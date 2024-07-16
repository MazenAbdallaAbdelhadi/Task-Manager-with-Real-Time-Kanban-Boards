import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().optional(),
  profileImage: z.any().optional(),
});
