import express from 'express';

import { findAPortNotInUse } from 'portscanner';

import type { ListenOptions } from 'net';

import { xterm } from 'cli-color';

import { NestFactory } from '@nestjs/core';

import { ExpressAdapter } from '@nestjs/platform-express';

import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

export async function bootstrap() {
  // 创建 Express 实例
  const instance = express();

  // 创建适配器
  const adapter = new ExpressAdapter(instance);

  // 创建 Nest 实例
  const application = await NestFactory.create(AppModule, adapter);

  // 兼容云函数与本地开发
  if (process.env.NODE_ENV === 'development') {
    // ConfigServices
    const configService = application.get(ConfigService);

    // 获取监听选项
    const listenOptions = configService.get<
      Required<Pick<ListenOptions, 'host' | 'port'>>
    >('listen', {
      host: '0.0.0.0',
      port: 3000,
    });

    // 获取端口
    const port = await findAPortNotInUse(listenOptions.port);

    // 监听
    await application.listen(port, () =>
      console.log(`\n\t🚀  Server running on port ${xterm(3)(port)}`)
    );
  } else {
    // 初始化 Nest 应用
    await application.init();
  }

  // 暴露实例
  return instance;
}

// 开发模式下启动开发
if (process.env.NODE_ENV === 'development') {
  bootstrap();
}
