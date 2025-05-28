import { IsUnique, RoleEnum, UsersDB } from 'src/common';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({ example: 'rusdifz' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Testpass98_' })
  @IsOptional()
  @IsString()
  password: string;
}

export class ReqCreateUserDTO {
  @ApiProperty({ example: 'rusdifz' })
  @IsNotEmpty()
  @IsString()
  @IsUnique(UsersDB, 'username', {
    message: 'username already exists ',
  })
  username: string;

  @ApiProperty({ example: 'fauzanrusdi20@gmail.com' })
  @IsOptional()
  @IsEmail()
  // @IsUnique(UsersDB, 'email', { message: 'Email already exist' }) //check email exist
  email: string;

  @ApiProperty({ example: 'Testpass98_' })
  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  password: string;

  @ApiPropertyOptional({ example: RoleEnum.ADMIN })
  @IsOptional()
  @IsEnum(RoleEnum, {
    message: 'Value status must be list in enum',
  })
  role: RoleEnum;
}
