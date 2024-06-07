import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { FormRepository } from 'src/repository/form.repository';

@Module({
  controllers: [FormController],
  providers: [FormService, FormRepository],
})
export class FormModule {}
