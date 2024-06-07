import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsCpf } from '../decorators/IsCpf';
import { Transform } from 'class-transformer';

export class CreateFormDto {
  @ApiProperty({ description: 'User name' })
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({ description: 'User email' })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({ description: 'User birthdate' })
  @IsDateString()
  @IsNotEmpty({ message: 'Birthdate is required' })
  birthdate: string;

  @ApiProperty({ description: 'User description' })
  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({ description: 'User CPF' })
  @IsString()
  @IsCpf()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsNotEmpty({ message: 'CPF is required' })
  cpf: string;

  @ApiProperty({
    description: 'User country',
  })
  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @ApiProperty({ description: 'User state' })
  @IsString()
  @IsNotEmpty({ message: 'State is required' })
  state: string;

  @ApiProperty({ description: 'User city' })
  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city: string;
}
