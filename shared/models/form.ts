export enum FormStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export interface IFormData {
  id: string;
  name: string;
  email: string;
  birthdate: string;
  description: string;
  cpf: string;
  country: string;
  state: string;
  city: string;
}

export type IForm = IFormData & IFormAttributes;

export interface IFormAttributes {
  createdAt: string;
  status: FormStatus;
}

export type IGetAllFormsResponse = IForm[];

export type IGetFormRequest = IForm["id"];
export type IGetFormResponse = IForm;

export type ICreateFormRequest = Omit<IFormData, "id">;
export type ICreateFormResponse = IForm["id"];

export type IUpdateFormRequest = {
  formId: IFormData["id"];
  data: Partial<IFormData>;
};

export type IDeleteFormRequest = IFormData["id"];

export type IUpdateFormResponse = void;

export interface IManegeForm extends IForm {}
