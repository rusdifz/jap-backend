import { ApiProperty } from '@nestjs/swagger';
import { Meta } from 'src/common';
import { ReqCreateUserDTO } from '../dto/request.dto';

export class SwgSignup {
  @ApiProperty()
  meta: Meta;

  @ApiProperty({ type: ReqCreateUserDTO, example: ReqCreateUserDTO })
  data: ReqCreateUserDTO;
}

export class SwgLogin {
  @ApiProperty()
  meta: Meta;
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhbHdhIiwiZW1haWwiOiJzYWx3YTIwQGdtYWlsLmNvbSIsImlzX3ZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzM3MDI4MjIzfQ.czgprych6ws6ukuvCdQmWtgC_9Stvfs5gMN4ts5iBBU',
  })
  data: JsonWebKey;
}
