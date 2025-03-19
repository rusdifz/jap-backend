import { ApiResponseOptions } from '@nestjs/swagger';
import {
  SwgCreateProperty,
  SwgDetailProperty,
  SwgListOffice,
} from './response.swagger';

export const swgGetListOK: ApiResponseOptions = {
  description: 'success',
  type: SwgListOffice,
};

export const swgGetDetailOK: ApiResponseOptions = {
  description: 'success',
  type: SwgDetailProperty,
};

export const swgCreateOK: ApiResponseOptions = {
  description: 'success',
  type: SwgCreateProperty,
};
