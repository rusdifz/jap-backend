import { ApiResponseOptions } from '@nestjs/swagger';
import { SwgLogin, SwgSignup } from './response.swagger';

export const swgSignupOK: ApiResponseOptions = {
  description: 'success',
  type: SwgSignup,
};

export const swgLoginOK: ApiResponseOptions = {
  description: 'success',
  type: SwgLogin,
};
