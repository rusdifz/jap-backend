import { RoleEnum } from 'src/common/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IUser } from 'src/common/interfaces';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { PaginationDTO } from 'src/common';

export class ReqUpdateUserDTO implements Partial<IUser> {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone_number: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  first_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  last_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsUrl()
  profile_picture: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  role: RoleEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  join_date: string;
}

export class UsersDTO extends PaginationDTO {
  @ApiPropertyOptional({ example: 'rusdifz' })
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({ example: 'rusdifz' })
  @IsOptional()
  role?: RoleEnum;
}

export class UserDetailDTO {
  @ApiPropertyOptional({ example: 'rusdifz' })
  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  username?: string;

  @ApiPropertyOptional({ example: 'fauzanrusdi20@gmail.com' })
  @ValidateIf((o) => !o.username)
  @IsNotEmpty()
  email?: string;
}
