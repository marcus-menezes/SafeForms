import { Module } from '@nestjs/common';
import { FormModule } from './form/form.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), FormModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
