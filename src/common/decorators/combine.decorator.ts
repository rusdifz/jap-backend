import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const BodyParam = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return { ...req.body, ...req.params };
});