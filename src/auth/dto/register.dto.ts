// src/auth/dto/auth.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { $Enums } from 'generated/prisma';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  role:$Enums.Role;
}
