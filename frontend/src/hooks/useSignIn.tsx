import { ISignInRequest } from "@/models/auth";
import { AuthApi } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () =>
  useMutation({
    mutationKey: ["useSignIn"],
    mutationFn: (params: ISignInRequest) => AuthApi.signIn(params),
  });
