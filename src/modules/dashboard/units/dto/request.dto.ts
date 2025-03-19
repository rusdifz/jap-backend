import {
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import {
  ConditionUnitEnum,
  PaginationDTO,
  PropertyStatusEnum,
  Unit,
} from 'src/common';

export class ReqCreateUnitDTO implements Partial<Unit> {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  property_id: number;

  @ApiProperty({ example: 26370 })
  @IsNotEmpty()
  @IsNumber()
  size: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsString()
  floor: string;

  @ApiProperty({ example: ConditionUnitEnum.BARE })
  @IsNotEmpty()
  @IsEnum(ConditionUnitEnum, {
    message: 'Value status must be list in enum',
  })
  condition: ConditionUnitEnum;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  available: boolean = true;

  @ApiProperty({ example: 26370 })
  @IsNotEmpty()
  @IsNumber()
  rent_sqm: number;

  @ApiProperty({ example: PropertyStatusEnum.LEASE })
  @IsOptional()
  @IsEnum(PropertyStatusEnum, {
    message: 'Value status must be list in enum',
  })
  status: PropertyStatusEnum;

  pic_name?: string;

  pic_phone?: string;
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
}
