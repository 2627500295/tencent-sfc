import { Injectable, NestMiddleware } from '@nestjs/common';

import type { Request, Response, NextFunction } from 'express';

import rid, { ConnectRidOptions } from 'connect-rid';

@Injectable()
export class ConnectRidMiddleware implements NestMiddleware {
  public static configure(options: ConnectRidOptions) {
    this.options = options;
  }

  private static options: ConnectRidOptions;

  public use(request: Request, response: Response, next: NextFunction) {
    rid(ConnectRidMiddleware.options)(request, response, next);
  }
}
