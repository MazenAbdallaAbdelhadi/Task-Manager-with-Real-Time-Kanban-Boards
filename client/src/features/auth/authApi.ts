import { z } from "zod";

import { api } from "@/api/api";

import { loginSchema } from "./validation/loginSchema";
import { registerSchema } from "./validation/registerSchema";
import { forgetPasswordSchema } from "./validation/forgetPasswordSchema";
import { confirmResetSchema } from "./validation/confirmResetSchema";
import { resetPasswordSchema } from "./validation/resetPasswordSchema";
import { ResponseObject } from "@/types/responseType";
import { User } from "@/types/user";

interface LoginResponse {
  token: string;
  user: User;
}
export const login = async (data: z.infer<typeof loginSchema>) => {
  return (await api.post<ResponseObject<LoginResponse>>("/v1/auth/login", data))
    .data;
};

interface RegisterResponse {
  token: string;
  user: User;
}
export const register = async (data: z.infer<typeof registerSchema>) => {
  return (
    await api.post<ResponseObject<RegisterResponse>>(
      "/v1/auth/register",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    )
  ).data;
};

export const forgetPassword = async (
  data: z.infer<typeof forgetPasswordSchema>
) => {
  return (await api.post<ResponseObject>("/v1/auth/forget-password", data))
    .data;
};

export const confirmReset = async (
  data: z.infer<typeof confirmResetSchema>
) => {
  return (await api.post<ResponseObject>("/v1/auth/confirm-reset", data)).data;
};

export const resetPassword = async (
  data: z.infer<typeof resetPasswordSchema>
) => {
  return (await api.post<ResponseObject>("/v1/auth/reset-password", data)).data;
};
