import { z } from "zod";
import { api } from "@/api/api";
import { ResponseObject } from "@/types/responseType";
import { User } from "@/types/user";
import { updatePasswordSchema } from "./validations/updatePasswordSchema";
import { editProfileSchema } from "./validations/editProfileSchema";

export const getLoggedUserProfile = async () => {
  return (await api.get<ResponseObject<User>>("/v1/users/getMe")).data;
};

export const updateLoggedUserProfile = async (
  data: z.infer<typeof editProfileSchema>
) => {
  return (
    await api.put<ResponseObject<User>>("/v1/users/updateMe", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  ).data;
};

export const updateLoggedUserPassword = async (
  data: z.infer<typeof updatePasswordSchema>
) => {
  return (
    await api.put<ResponseObject<{ token: string }>>(
      "/v1/users/changeMyPassword",
      data
    )
  ).data;
};

export const deleteLoggedUserAccount = async () => {
  return (await api.delete<ResponseObject>("/v1/users/deleteMe")).data;
};
