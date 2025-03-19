import { Controller, Get, Query, Version } from '@nestjs/common';

import { GetListFeedbackDTO } from './dto/request.dto';

import { ClientFeedbackService } from './feedback.service';

@Controller('client/feedback')
export class ClientFeedbackController {
  constructor(private readonly service: ClientFeedbackService) {}

  @Version('1')
  @Get('')
  async getList(@Query() query: GetListFeedbackDTO) {
    return await this.service.getList(query);
  }
}
