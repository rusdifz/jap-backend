import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller('')
export class AppController {
  constructor() {}

  @Get('')
  async checkHealth() {
    return 'run server'
  }
}
