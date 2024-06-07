import {
  ICreateFormRequest,
  ICreateFormResponse,
  IDeleteFormRequest,
  IGetAllFormsResponse,
  IGetFormRequest,
  IGetFormResponse,
  IUpdateFormRequest,
  IUpdateFormResponse,
} from "@safe-forms/shared/models";
import { api } from "./base.service";

const baseUrl = "/forms";

export const FormApi = {
  getAllForms: () => api.get<IGetAllFormsResponse>(baseUrl),

  getForm: (props: IGetFormRequest) =>
    api.get<IGetFormResponse>(baseUrl, {
      params: props,
    }),

  createForm: (props: ICreateFormRequest) =>
    api.post<ICreateFormResponse>(baseUrl, props),

  updateForm: ({ data, formId }: IUpdateFormRequest) =>
    api.put<IUpdateFormResponse>(baseUrl + `/${formId}`, data),

  deleteForm: (formId: IDeleteFormRequest) =>
    api.delete<IUpdateFormResponse>(baseUrl + `/${formId}`),
};
