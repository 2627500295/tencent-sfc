import { Injectable, NestMiddleware } from '@nestjs/common';

import type { Request, Response, NextFunction } from 'express';

import connectTimeout, { TimeoutOptions } from 'connect-timeout';

@Injectable()
export class ConnectTimeoutMiddleware implements NestMiddleware {
  private static timeout: string;

  private static options: TimeoutOptions;

  public static configure(timeout: string, opts?: TimeoutOptions) {
    this.timeout = timeout;
    this.options = opts;
  }

  public use(request: Request, response: Response, next: NextFunction) {
    if (!ConnectTimeoutMiddleware.timeout) {
      throw new Error(
        'ConnectTimeoutMiddleware requires a timeout string in configure.'
      );
    }

    connectTimeout(
      ConnectTimeoutMiddleware.timeout,
      ConnectTimeoutMiddleware.options
    )(request, response, next);
  }
}
