import { FormApi } from "@/services/form.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateForm = () =>
  useMutation({
    mutationKey: ["useUpdateForm"],
    mutationFn: FormApi.updateForm,
  });
