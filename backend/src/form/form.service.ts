import { Injectable } from '@nestjs/common';
import {
  FormStatus,
  ICreateFormRequest,
  ICreateFormResponse,
  IDeleteFormRequest,
  IForm,
  IGetAllFormsResponse,
  IGetFormRequest,
  IGetFormResponse,
  IUpdateFormRequest,
  IUpdateFormResponse,
} from '@safe-forms/shared/models';
import { FormRepository } from '../repository/form.repository';

@Injectable()
export class FormService {
  constructor(private readonly formRepository: FormRepository) {}

  public async getAllForms(userId: string): Promise<IGetAllFormsResponse> {
    return this.formRepository.getAllForms(userId);
  }

  public async getForm(formId: IGetFormRequest): Promise<IGetFormResponse> {
    return this.formRepository.getForm(formId);
  }

  public async createForm(
    data: ICreateFormRequest,
    userId: string,
  ): Promise<ICreateFormResponse> {
    console.log({ data });
    const completeData: Omit<IForm, 'id'> & { userId: string } = {
      ...data,
      createdAt: new Date().toISOString(),
      status: FormStatus.PUBLISHED,
      userId,
    };
    return this.formRepository.createForm(completeData);
  }

  public async updateForm({
    data,
    formId,
  }: IUpdateFormRequest): Promise<IUpdateFormResponse> {
    return this.formRepository.updateForm(formId, data);
  }

  public async deleteForm(formId: IDeleteFormRequest) {
    return this.formRepository.deleteForm(formId);
  }
}
