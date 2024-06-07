import { FormApi } from "@/services/form.service";
import { useMutation } from "@tanstack/react-query";

export const useCreateForm = () =>
  useMutation({
    mutationKey: ["useCreateForm"],
    mutationFn: FormApi.createForm,
  });
