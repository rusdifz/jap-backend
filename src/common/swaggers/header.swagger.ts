import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function CommonHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'api-key',
      example: 'razfz-s4lw0a1',
      examples: {
        'api-key': {
          summary: 'api-key',
          value: 'razfz-s4lw0a1',
        },
      },
      required: true,
    }),
  );
}

export const AuthorizationHeader = (required = false) => {
  return {
    name: 'Authorization',
    required,
  };
};
