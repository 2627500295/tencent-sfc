import { Injectable, NestMiddleware } from '@nestjs/common';

import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class XPoweredByMiddleware implements NestMiddleware {
  public static configure(value: string | boolean = false) {
    this.value = value;
  }

  private static value: string | boolean = false;

  public use(request: Request, response: Response, next: NextFunction) {
    if (!XPoweredByMiddleware.value) {
      response.removeHeader('X-Powered-By');
    } else if (XPoweredByMiddleware.value === true) {
      response.set('X-Powered-By', 'Express');
    } else {
      response.set('X-Powered-By', XPoweredByMiddleware.value);
    }

    next();
  }
}
