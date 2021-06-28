import 'reflect-metadata';

import Koa from 'koa';

import { Container } from 'typedi';

import { createKoaServer, useContainer } from 'routing-controllers';

import bodyParser from 'koa-bodyparser';

import json from 'koa-json';

import etag from 'koa-etag';

import { DolphinController } from './controllers';

import { universalErrorHandler } from './middlewares';

export function bootstrap() {
  // 应用容器
  useContainer(Container);

  // 创建实例
  const instance: Koa = createKoaServer({
    defaultErrorHandler: false,
    controllers: [DolphinController],
    middlewares: [],
  });

  // 应用中间件
  instance
    .use(bodyParser()) // Body 解析
    .use(json()) // 返回 JSON
    .use(etag()) // ETag
    .use(universalErrorHandler); // 错误处理

  // 开发环境
  if (process.env.NODE_ENV === 'development') {
    // 端口
    const port = 3000;

    // 监听端口
    instance.listen(port);

    // 运行提示
    console.log(`\n\t🚀  Server running on port %d`, port);
  }

  // 非开发环境
  return instance;
}

// 开发环境
if (process.env.NODE_ENV === 'development') {
  // 运行启动器
  bootstrap();
}
