import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { FormService } from './form.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@ApiTags('Forms')
@Controller('forms')
@UseInterceptors(AuthInterceptor)
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os forms' })
  public async getAllForms(@Req() req) {
    return this.formService.getAllForms(req.userId);
  }

  @Get(':formId')
  @ApiOperation({ summary: 'Obter um form específico' })
  @ApiParam({ name: 'formId', description: 'ID do formulário' })
  public async getForm(@Param('formId') formId: string) {
    return this.formService.getForm(formId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo form' })
  public async createForm(@Req() req, @Body() createFormDto: CreateFormDto) {
    return this.formService.createForm(createFormDto, req.userId);
  }

  @Put(':formId')
  @ApiOperation({ summary: 'Editar um form existente' })
  @ApiParam({ name: 'formId', description: 'ID do formulário' })
  public async updateForm(
    @Param('formId') formId: string,
    @Body() updateFormDto: UpdateFormDto,
  ) {
    return this.formService.updateForm({ data: updateFormDto, formId });
  }

  @Delete(':formId')
  @ApiOperation({ summary: 'Deletar um form existente' })
  @ApiParam({ name: 'formId', description: 'ID do formulário' })
  public async deleteForm(@Param('formId') formId: string) {
    return this.formService.deleteForm(formId);
  }
}
