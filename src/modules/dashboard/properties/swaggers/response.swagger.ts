import { ApiProperty } from '@nestjs/swagger';
import { Meta, MetaUpsert, Pagination } from 'src/common';

import { ReqCreatePropertyDTO } from '../dto/request.dto';
import { ResProperty } from '../dto/response.dto';

export class SwgListOffice {
  @ApiProperty()
  meta: Meta;

  @ApiProperty({ type: [ResProperty] })
  data: ResProperty[];

  @ApiProperty({ type: Pagination })
  pagination: Pagination;
}

export class SwgDetailProperty {
  @ApiProperty()
  meta: Meta;

  @ApiProperty({ type: ResProperty, example: ResProperty })
  data: ResProperty;
}

export class SwgCreateProperty {
  @ApiProperty()
  meta: MetaUpsert;

  @ApiProperty({ type: ReqCreatePropertyDTO, example: ReqCreatePropertyDTO })
  data: ReqCreatePropertyDTO;
}
