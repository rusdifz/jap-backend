import { ApiProperty } from '@nestjs/swagger';

import { ConditionUnitEnum, PropertyStatusEnum, Unit } from 'src/common';

export class ResUnit implements Partial<Unit> {
  @ApiProperty()
  unit_id: string;

  @ApiProperty()
  property_id: number;

  @ApiProperty()
  size: string;

  @ApiProperty()
  floor: string;

  @ApiProperty()
  condition: ConditionUnitEnum;

  @ApiProperty()
  available: boolean;

  @ApiProperty()
  rent_price: number;

  service_charge_info?: string;

  service_charge_price?: number;

  @ApiProperty()
  status: PropertyStatusEnum;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
