import { Role } from '@app/common';
import { Optional } from '@nestjs/common';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class CreateUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @Optional()
  @IsArray()
  @IsNotEmpty({ each: true })
  roles?: Role[];
}
