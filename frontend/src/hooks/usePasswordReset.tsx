import { IPasswordResetRequest } from "@/models/auth";
import { AuthApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const usePasswordReset = () =>
  useMutation({
    mutationKey: ["usePasswordReset"],
    mutationFn: (params: IPasswordResetRequest) =>
      AuthApi.passwordReset(params),
  });
