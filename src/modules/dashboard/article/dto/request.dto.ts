import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsUrl,
  IsEnum,
} from 'class-validator';

import {
  IsUnique,
  ArticleDB,
  StatusPublishEnum,
  PaginationDTO,
} from 'src/common';

export class ArticleListDTO extends PaginationDTO {
  @IsOptional()
  @Transform(({ value }) => value?.toLowerCase())
  search_keyword?: string;

  @ApiProperty({ example: StatusPublishEnum.DRAFT })
  @IsOptional()
  @IsEnum(StatusPublishEnum, {
    message: 'Value status must be list in enum',
  })
  status_publish: StatusPublishEnum;
}

export class ReqCreateArticleDTO {
  @IsNotEmpty()
  @IsString()
  @IsUnique(ArticleDB, 'title', {
    message: 'The title already exists ',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  thumbnail: string;

  @IsOptional()
  @IsUrl()
  url_youtube: string;

  @IsOptional()
  @IsString()
  tags: string;

  @ApiProperty({ example: StatusPublishEnum.DRAFT })
  @IsOptional()
  @IsEnum(StatusPublishEnum, {
    message: 'Value status must be list in enum',
  })
  status_publish: StatusPublishEnum;
}

export class ReqUpdateArticleDTO extends ReqCreateArticleDTO {
  @IsNotEmpty()
  // @IsNumber()
  article_id: number;
}
