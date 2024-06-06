import { ISignUpRequest } from "@/models/auth";
import { AuthApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () =>
  useMutation({
    mutationKey: ["useSignUp"],
    mutationFn: async (params: ISignUpRequest) => AuthApi.signUp(params),
  });
