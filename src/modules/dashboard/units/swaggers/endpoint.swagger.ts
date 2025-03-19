import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwgCreateUnit,
  SwgUpdateUnit,
  SwgDetailUnit,
  SwgListunit,
} from './response.swagger';

export const swgGetListOK: ApiResponseOptions = {
  description: 'success',
  type: SwgListunit,
};

export const swgGetDetailOK: ApiResponseOptions = {
  description: 'success',
  type: SwgDetailUnit,
};

export const swgCreateOK: ApiResponseOptions = {
  description: 'success',
  type: SwgCreateUnit,
};

export const swgUpdateOK: ApiResponseOptions = {
  description: 'success',
  type: SwgUpdateUnit,
};
