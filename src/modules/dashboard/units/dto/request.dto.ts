import {
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import {
  ConditionUnitEnum,
  PaginationDTO,
  PropertyStatusEnum,
  Unit,
} from 'src/common';

export class ReqCreateUnitDTO implements Unit {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  property_id: number;

  @ApiProperty({ example: 26370 })
  @IsOptional()
  // @IsNumberString()
  size: string;

  @ApiProperty({ example: '10' })
  @IsOptional()
  @IsString()
  floor: string = '';

  @ApiProperty({ example: ConditionUnitEnum.BARE })
  @IsNotEmpty()
  @IsEnum(ConditionUnitEnum, {
    message: 'Value status must be list in enum',
  })
  condition: ConditionUnitEnum = ConditionUnitEnum.BARE;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  available: boolean;

  @ApiProperty({ example: 26370 })
  @IsNotEmpty()
  @IsNumber()
  rent_price: number;

  @ApiProperty({ example: PropertyStatusEnum.LEASE })
  @IsOptional()
  @IsEnum(PropertyStatusEnum, {
    message: 'Value status must be list in enum',
  })
  status: PropertyStatusEnum;

  @IsOptional()
  @IsString()
  pic_name: string;

  @IsOptional()
  @IsString()
  pic_phone: string;

  @IsOptional()
  @IsString()
  service_charge_info: string;

  @IsOptional()
  @IsNumber()
  service_charge_price: number;
}

export class ReqUpdateUnitDTO extends ReqCreateUnitDTO {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsString()
  unit_id: string;
}

export class UnitListDTO extends PaginationDTO {
  @IsNotEmpty()
  property_id: string;

  @IsOptional()
  @IsString()
  status: string;
}
