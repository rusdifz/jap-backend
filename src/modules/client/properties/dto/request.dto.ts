import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';

import {
  LocationEnum,
  PaginationDTO,
  PropertyStatusEnum,
  PropertyTypeEnum,
} from 'src/common';

export class PropertiesDTO extends PaginationDTO {
  @IsOptional()
  location?: LocationEnum | string;

  @IsOptional()
  property_type?: PropertyTypeEnum;

  @IsOptional()
  property_status?: PropertyStatusEnum;

  @IsOptional()
  amenities?: string[];

  @IsOptional()
  @Transform(({ value }) => value?.toLowerCase())
  search_keyword?: string;
}

export class PropertyDetailDTO {
  @ValidateIf((o) => !o.slug)
  @IsNotEmpty()
  @IsNumber()
  property_id?: number;

  @ValidateIf((o) => !o.property_id)
  @IsNotEmpty()
  @IsString()
  slug?: string;
}
