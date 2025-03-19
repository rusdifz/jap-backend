import { ApiProperty } from '@nestjs/swagger';
import { Meta, MetaUpsert, Pagination } from 'src/common';
import { ResUnit } from '../dto/response.dto';
import { ReqCreateUnitDTO, ReqUpdateUnitDTO } from '../dto/request.dto';

export class SwgListunit {
  @ApiProperty()
  meta: Meta;

  @ApiProperty({ type: [ResUnit] })
  data: ResUnit[];

  @ApiProperty({ type: Pagination })
  pagination: Pagination;
}

export class SwgDetailUnit {
  @ApiProperty()
  meta: Meta;

  @ApiProperty({ type: ResUnit, example: ResUnit })
  data: ResUnit;
}

export class SwgCreateUnit {
  @ApiProperty()
  meta: MetaUpsert;

  @ApiProperty({ type: ReqCreateUnitDTO })
  data: ReqCreateUnitDTO;
}

export class SwgUpdateUnit {
  @ApiProperty()
  meta: MetaUpsert;

  @ApiProperty({ type: ReqUpdateUnitDTO })
  data: ReqUpdateUnitDTO;
}
