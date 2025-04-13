import {
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
} from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';
import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';

import { IFeedback, PaginationDTO, StatusPublishEnum } from 'src/common';

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

  @ApiProperty({ example: StatusPublishEnum.PUBLISH })
  @IsNotEmpty()
  @IsEnum(StatusPublishEnum, {
    message: 'Value status must be list in enum',
  })
  status_publish: StatusPublishEnum;
}

export class ReqUpdateFeedbackDTO extends PartialType(ReqCreateFeedbackDTO) {
  @ApiHideProperty()
  @IsNotEmpty()
  @IsNumber()
  feedback_id: number;
}

export class GetListFeedbackDTO extends PaginationDTO {
  @ApiProperty({ example: StatusPublishEnum.DRAFT })
  @IsOptional()
  @IsEnum(StatusPublishEnum, {
    message: 'Value status must be list in enum',
  })
  status_publish: StatusPublishEnum;
}
