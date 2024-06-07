import { FormApi } from "@/services/form.service";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

export const useGetAllForms = () =>
  useQuery({
    queryKey: ["useGetAllForms", getCookie("token")],
    queryFn: FormApi.getAllForms,
  });
