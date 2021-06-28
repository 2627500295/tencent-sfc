import { HttpResponse } from '../helpers';

import { Next, Context } from 'koa';

export async function universalErrorHandler(context: Context, next: Next) {
  try {
    await next();

    if (context.status === 404) {
      context.throw(404);
    }
  } catch (err) {
    // 错误消息
    const message = err.body || err.message;

    // 错误状态
    context.status = err.status || 500;

    // 响应
    const response = HttpResponse.failure(message, -1, { path: context.path });
    context.body = response;
  }
}
