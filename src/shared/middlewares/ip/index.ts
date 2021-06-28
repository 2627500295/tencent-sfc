import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

import { getClientIp } from '../../utilities';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  public use(
    request: Request & { __EVENT__: any },
    response: Response,
    next: NextFunction
  ) {
    request.clientIp = getClientIp(request);
    next();
  }
}
