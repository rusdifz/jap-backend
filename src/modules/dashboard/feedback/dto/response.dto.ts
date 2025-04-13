import { ApiProperty } from '@nestjs/swagger';
import { IFeedback, StatusPublishEnum, dayjs } from 'src/common';
import { Transform } from 'class-transformer';

export class ResFeedback implements Partial<IFeedback> {
  @ApiProperty()
  feedback_id: number;

  @ApiProperty()
  profile_image: string;

  @ApiProperty()
  profile_name: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  status_publish?: StatusPublishEnum;

  @ApiProperty()
  @Transform(({ value }) => dayjs(value).format('MMMM D, YYYY'))
  created_at: Date;

  @ApiProperty()
  @Transform(({ value }) => dayjs(value).format('MMMM D, YYYY'))
  updated_at: Date;

  @ApiProperty()
  created_by: string;

  @ApiProperty()
  updated_by: string;
}
