import { Injectable, NestMiddleware } from '@nestjs/common';

import type { Request, Response, NextFunction } from 'express';

import responseTime, { ResponseTimeOptions } from 'response-time';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  public static configure(options: ResponseTimeOptions) {
    this.options = options;
  }

  private static options: ResponseTimeOptions;

  public use(request: Request, response: Response, next: NextFunction) {
    responseTime(ResponseTimeMiddleware.options)(request, response, next);
  }
}
