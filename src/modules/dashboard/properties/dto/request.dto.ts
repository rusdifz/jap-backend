import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  ValidateNested,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiHideProperty,
  PartialType,
} from '@nestjs/swagger';

import {
  IProperty,
  IsUnique,
  StatusPublishEnum,
  PropertiesDB,
  LocationEnum,
  PropertyTypeEnum,
  PaginationDTO,
  PropertyStatusEnum,
} from 'src/common';

class OvertimePrice {
  @ApiPropertyOptional({ example: '210000' })
  @IsOptional()
  @IsString()
  electricity: string;

  @ApiPropertyOptional({ example: '210000' })
  @IsOptional()
  @IsString()
  lighting: string;

  @ApiPropertyOptional({ example: '210000' })
  @IsOptional()
  @IsString()
  ac: string;
}

class ParkingChargeDetail {
  @ApiPropertyOptional({ example: 200000 })
  @IsOptional()
  // @IsNumber()
  car: string;

  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  // @IsNumber()
  motorcycle: string;
}

class ParkingCharge {
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ParkingChargeDetail)
  reserved: ParkingChargeDetail;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ParkingChargeDetail)
  unreserved: ParkingChargeDetail;
}

class Price {
  @ApiPropertyOptional({ example: '1000000' })
  @IsOptional()
  @IsString()
  phone_deposit: string;

  @ApiPropertyOptional({ example: '1000000' })
  @IsOptional()
  @IsString()
  booking_deposit: string;

  @ApiPropertyOptional({ example: '1000000' })
  @IsOptional()
  @IsString()
  security_deposit: string;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OvertimePrice)
  overtime: OvertimePrice;

  @ApiPropertyOptional({ example: 300000 })
  @IsOptional()
  @IsNumber()
  ground_floor_sqm: number;

  @ApiPropertyOptional({ example: 210000 })
  @IsOptional()
  @IsNumber()
  rent_sqm: number;

  @ApiProperty({
    example: {
      price: 127500.0,
      info: 'Include AC during office hour, Lighting & Electricity is separately metered',
    },
  })
  @IsOptional()
  @IsObject()
  service_charge: {
    price: number;
    info: string;
  };

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ParkingCharge)
  parking_charge: ParkingCharge;
}

class Spesification {
  @ApiProperty({ example: 16900.0 })
  @IsOptional()
  @IsNumber()
  property_size: number;

  @ApiProperty({ example: '08.00 AM - 06.00 PM' })
  @IsOptional()
  @IsString()
  office_hours_weekday: string;

  @ApiProperty({ example: '08.00 AM - 01.00 PM' })
  @IsOptional()
  @IsString()
  office_hours_weekend: string;

  @ApiProperty({ example: 20 })
  @IsOptional()
  @IsNumber()
  total_floor: number;

  @ApiProperty({ example: 900.0 })
  @IsOptional()
  @IsNumber()
  size_floor: number;

  provider_internet: string;
}

class Nearby {
  @ApiProperty({ example: 'Halte Busway Gatot Subroto' })
  @IsOptional()
  @IsString()
  bus_station: string;

  @ApiProperty({ example: 'Rs Siloam' })
  @IsOptional()
  @IsString()
  hospital: string;

  @ApiProperty({ example: 'Polsek Jakarta Selatan' })
  @IsOptional()
  @IsString()
  police: string;

  @ApiProperty({ example: 'Bellagio Boutique Mall' })
  @IsOptional()
  @IsString()
  mall: string;
}

class Terms {
  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  minium_lease: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  payment: string;
}

class Telecommunication {
  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isp: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  fiber_optic: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  wifi: boolean;
}

class FireSafety {
  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  sprinkle: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  heat_detector: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  smoke_detector: boolean;
}

class OtherInfo {
  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  loading_capacity: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  ac_system: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  ac_zoning: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  electricity: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  power_unit: string;
}

export class ReqCreatePropertyDTO implements Partial<IProperty> {
  @ApiProperty({ example: 'Thamrin Building' })
  @IsNotEmpty()
  @IsString()
  @IsUnique(PropertiesDB, 'name', { message: 'Duplicate name Property' })
  name: string;

  @IsOptional()
  @IsNumber()
  popular: number;

  @ApiProperty({ example: 'Lorem ipsum jaya abadi' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: `Alam Sutera, Jl. Jalur Sutera Boulevard No.1, RT.002/RW.006, 
    Panunggangan Tim., Kec. Pinang, Kota Tangerang, Banten 15143`,
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: LocationEnum.AMPERA,
  })
  @IsNotEmpty()
  @IsEnum(LocationEnum, {
    message: 'Value status must be list in enum',
  })
  location: LocationEnum;

  @ApiProperty({
    example: 'QRPC+48 Karet Kuningan, South Jakarta City, Jakarta',
  })
  @IsNotEmpty()
  @IsString()
  koordinat_map: string;

  @ApiPropertyOptional({ example: StatusPublishEnum.DRAFT })
  @IsOptional()
  @IsEnum(StatusPublishEnum, {
    message: 'Value status must be list in enum',
  })
  status_publish: StatusPublishEnum;

  @ApiPropertyOptional({ example: PropertyStatusEnum.LEASE })
  @IsOptional()
  @IsEnum(PropertyStatusEnum, {
    message: 'Value status must be list in enum',
  })
  property_status?: PropertyStatusEnum;

  @ApiPropertyOptional({ example: PropertyTypeEnum.OFFICE })
  @IsOptional()
  @IsEnum(PropertyTypeEnum, {
    message: 'Value status must be list in enum',
  })
  property_type: PropertyTypeEnum;

  @ApiPropertyOptional({ example: 'Q3 2015' })
  @IsOptional()
  @IsString()
  completion: string;

  @ApiPropertyOptional({
    example: ['A/C & Heating', 'Garages', 'Garden', 'Disabled Access'],
  })
  @IsOptional()
  @IsArray()
  amenities: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Price)
  price: Price;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Spesification)
  spesification: Spesification;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Nearby)
  nearby: Nearby;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Terms)
  terms: Terms;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Telecommunication)
  telecommunication: Telecommunication;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FireSafety)
  fire_safety: FireSafety;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OtherInfo)
  other_info: OtherInfo;
}

export class ReqUpdatePropertyDTO extends PartialType(ReqCreatePropertyDTO) {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsNumber()
  property_id: number;
}

export class PropertiesDTO extends PaginationDTO {
  @IsOptional()
  location?: LocationEnum;

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

export class GeneratePDFDTO {
  @IsNotEmpty()
  @IsArray()
  property_id: number[];
}
