import serverlessHttp from 'serverless-http';

import type { InstanceRequest } from './shared/interfaces';

import { bootstrap } from './main';

export async function main(event: any, context: any) {
  /**
   * 获取实例
   */
  const instance = await bootstrap();

  /**
   * 获取请求
   */
  const request: InstanceRequest = instance.request;

  /**
   * 绑定事件
   */
  request.__EVENT__ = event;

  /**
   * 绑定上下文
   */
  request.__CONTEXT__ = context;

  /**
   * 禁用 X-Powered-By 头
   */
  instance.disable('x-powered-by');

  /**
   * Serverless Http 代理
   */
  return serverlessHttp(instance)(event, context);
}
