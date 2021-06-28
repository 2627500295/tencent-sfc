import { Injectable, NestMiddleware } from '@nestjs/common';

import type { Request, Response, NextFunction } from 'express';

import cookieParser, { CookieParseOptions } from 'cookie-parser';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
  public static configure(
    secret: string | string[],
    options?: CookieParseOptions
  ) {
    this.secret = secret;

    if (options) {
      this.options = options;
    }
  }

  private static secret: string | string[];

  private static options: CookieParseOptions;

  public use(request: Request, response: Response, next: NextFunction) {
    cookieParser(CookieParserMiddleware.secret, CookieParserMiddleware.options)(
      request,
      response,
      next
    );
  }
}
