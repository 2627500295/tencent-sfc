import express from 'express';

import { NestApplicationOptions } from '@nestjs/common';

import { NestFactory, AbstractHttpAdapter } from '@nestjs/core';

import { ExpressAdapter } from '@nestjs/platform-express';

import { ConfigService } from '@nestjs/config';

import { findAPortNotInUse } from 'portscanner';

import { xterm } from 'cli-color';

import { AppModule } from './app.module';

export interface ListenOptions {
  host: string;
  port: number;
}

/**
 * 创建 Nest 服务
 *
 * @param server
 */
export async function createNestServer(
  adapter: AbstractHttpAdapter,
  options?: NestApplicationOptions
) {
  // 创建实例
  const application = await NestFactory.create(AppModule, adapter, options);

  // 初始化应用
  await application.init();

  // 返回应用
  return application;
}

/**
 * 启动器
 */
export async function bootstrap() {
  // 创建 Express 实例
  const instance = express();

  // 适配器
  const adapter = new ExpressAdapter(instance);

  // Nest 应用选项
  const nestApplicationOptions = {
    logger: false,
  };

  // 创建 Nest 服务
  const application = await createNestServer(adapter, nestApplicationOptions);

  // 兼容云函数与本地开发
  if (process.env.NODE_ENV === 'local') {
    /**
     * 获取配置服务
     */
    const configService = application.get(ConfigService);

    /**
     * 默认 Lister 选项
     */
    const defaultListenOptions: ListenOptions = {
      host: '0.0.0.0',
      port: 3000,
    };

    /**
     * 获取监听选项
     */
    const listenOptions = configService.get<ListenOptions>(
      'listen',
      defaultListenOptions
    );

    /**
     * 获取端口
     */
    const port = await findAPortNotInUse(listenOptions.port);

    /**
     * 监听
     */
    instance.listen(port, () =>
      console.log(`\n\t🚀  Server running on port ${xterm(3)(port)}`)
    );
  }

  // 暴露实例
  return instance;
}

// 开发模式下启动开发
if (process.env.NODE_ENV === 'local') {
  bootstrap();
}
