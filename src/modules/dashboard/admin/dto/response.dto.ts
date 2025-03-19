import { dayjs, RoleEnum, IUser } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ResUserDTO implements Partial<IUser> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  phone_number: string;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  profile_picture: string;

  @ApiProperty()
  @IsString()
  role: RoleEnum;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => dayjs(value).format('MMMM D, YYYY'))
  created_at: string;
}

export class ResUserListDTO implements Partial<IUser> {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsString()
  @Transform(({ value }) => dayjs(value).format('MMMM D, YYYY'))
  created_at: string;
}
