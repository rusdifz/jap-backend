import { ApiResponseOptions } from '@nestjs/swagger';
import { SwgDeleteResp } from './common-response.swagger';

export const swgDeleteOK: ApiResponseOptions = {
  description: 'success',
  type: SwgDeleteResp,
};
