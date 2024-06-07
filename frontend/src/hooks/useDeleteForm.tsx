import { FormApi } from "@/services/form.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteForm = () =>
  useMutation({
    mutationKey: ["useCreateForm"],
    mutationFn: FormApi.deleteForm,
  });
