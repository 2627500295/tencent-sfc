import express from 'express';

import { findAPortNotInUse } from 'portscanner';

import { xterm } from 'cli-color';

import { VersioningType } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { ExpressAdapter } from '@nestjs/platform-express';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { ListenOptions } from './shared/interfaces';

/**
 * 启动器
 */
export async function bootstrap() {
  // 创建 Express 实例
  const instance = express();

  // 适配器
  const adapter = new ExpressAdapter(instance);

  // 创建 Nest 实例
  const application = await NestFactory.create(AppModule, adapter, {
    logger: false,
  });

  // 启用版本
  application.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  // 微服务
  await application.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          protocol: 'amqps',
          hostname: 'cougar.rmq.cloudamqp.com',
          port: 5672,
          username: 'jpczqwdg',
          password: 'IjArd4ge7qScM69dOlJfxmhpQg1HfFBf',
          vhost: 'jpczqwdg',
        },
      ],
      queue: 'ip',
      queueOptions: {
        durable: false,
      },
    },
  });

  // 初始化应用
  await application.init();

  // 兼容云函数与本地开发
  if (process.env.NODE_ENV === 'local') {
    // 获取配置服务
    const configService = application.get(ConfigService);

    // 默认 Lister 选项
    const defaultListenOptions: ListenOptions = {
      host: '0.0.0.0',
      port: 3000,
    };

    // 获取监听选项
    const listenOptions = configService.get<ListenOptions>(
      'listen',
      defaultListenOptions
    );

    // 获取端口
    const port = await findAPortNotInUse(listenOptions.port);

    // 监听
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
