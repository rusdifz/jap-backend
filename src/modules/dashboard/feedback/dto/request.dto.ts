import {
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { IFeedback, PaginationDTO } from 'src/common';

export class ReqCreateFeedbackDTO implements Partial<IFeedback> {
  @ApiProperty({ example: 'https://url' })
  @IsOptional()
  @IsString()
  profile_image: string;

  @ApiProperty({ example: 'fauzan rusdi' })
  @IsNotEmpty()
  @IsString()
  profile_name: string;

  @ApiProperty({ example: 'Sangat Bagus Sejauh Ini' })
  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class ReqUpdateFeedbackDTO extends ReqCreateFeedbackDTO {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsNumber()
  feedback_id: number;
}

export class GetListFeedbackDTO extends PaginationDTO {}
