import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { IsUnique } from 'src/common';
import { MasterLocationDB } from 'src/common/entities/master-location.entity';
import { IMasterLocation } from 'src/common/interfaces/master-location';

export class ReqCreateMasterLocationDTO implements Partial<IMasterLocation> {
  @IsNotEmpty()
  @IsString()
  @IsUnique(MasterLocationDB, 'location_name', {
    message: 'Duplicate name Location',
  })
  location_name: string;

  @IsNotEmpty()
  @IsNumber()
  position: number;

  @IsOptional()
  @IsBoolean()
  activate_homepage: boolean = false;
}

export class ReqUpdateMasterLocationDTO extends ReqCreateMasterLocationDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
