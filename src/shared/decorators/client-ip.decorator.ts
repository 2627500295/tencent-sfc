import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { getClientIp } from '../utilities';

export const ClientIp = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return getClientIp(request);
  }
);
