import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { IsCpf } from '../decorators/IsCpf';
import { Transform } from 'class-transformer';

export class UpdateFormDto {
  @ApiProperty({ description: 'User name', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'User email', required: false })
  @IsEmail({}, { message: 'Invalid email' })
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'User birthdate', required: false })
  @IsDateString()
  @IsOptional()
  birthdate?: string;

  @ApiProperty({ description: 'User description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'User CPF', required: false })
  @IsCpf({ message: 'Invalid CPF' })
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsOptional()
  cpf?: string;

  @ApiProperty({
    description: 'User country',
    enum: ['Brasil', 'Estados Unidos', 'Canadá', 'Outro'],
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({ description: 'User state', required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ description: 'User city', required: false })
  @IsString()
  @IsOptional()
  city?: string;
}
