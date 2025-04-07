import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDTO {
  @ApiPropertyOptional()
  @IsOptional()
  sort?: string = 'created_at';

  @ApiPropertyOptional()
  @IsOptional()
  order?: string = 'desc';

  @ApiPropertyOptional()
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional()
  @IsOptional()
  limit: number = 5;
}
