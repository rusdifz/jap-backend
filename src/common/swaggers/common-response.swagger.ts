import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty({
    example: 200,
  })
  code: number;

  @ApiProperty({
    example: 'success',
  })
  msg: string;
}

export class Pagination {
  @ApiProperty({ example: 5 })
  total: number;

  @ApiProperty({ example: 1 })
  total_page: number;

  @ApiProperty({ example: 1 })
  page: number;
}

export class MetaUpsert {
  @ApiProperty({
    example: 201,
  })
  code: number;

  @ApiProperty({
    example: 'success',
  })
  msg: string;
}

export class SwgDeleteResp {
  @ApiProperty()
  meta: Meta;

  @ApiProperty()
  data: {};
}
