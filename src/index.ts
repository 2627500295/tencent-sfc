import serverlessHttp from 'serverless-http';

import { bootstrap } from './main';

export async function main(event: any, context: any) {
  // 获取实例
  const instance = bootstrap();

  // 获取请求
  const request = instance.request;

  // 写入云函数事件与上下文
  request.__SCF__ = { event, context };
  request.__CONTEXT__ = context;
  request.__EVENT__ = event;

  // Severless Http
  return serverlessHttp(instance)(event, context);
}
