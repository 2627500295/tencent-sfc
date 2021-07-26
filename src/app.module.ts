import * as redisStore from 'cache-manager-ioredis';

import {
  Module,
  CacheModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { CookieParserMiddleware } from './shared/middlewares';

import { IpController, IpService } from './ip';

@Module({
  imports: [
    /* Config */
    ConfigModule.forRoot({
      envFilePath: [],
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [],
      isGlobal: true,
    }),

    /* 缓存模块 */
    CacheModule.registerAsync({
      useFactory() {
        return {
          store: redisStore,
          host: 'redis-12460.c241.us-east-1-4.ec2.cloud.redislabs.com',
          port: 12460,
          password: 'w7B2j5LwrxLRtNMW1aiF1dtWjq4vv1b0',
          db: 0,
          ttl: 600,
        };
      },
    }),

    /* MongoDB */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory() {
        return {
          type: 'mongodb',
          host: 'cluster-01-shard-00-00.pkhho.mongodb.net,cluster-01-shard-00-01.pkhho.mongodb.net,cluster-01-shard-00-02.pkhho.mongodb.net',
          replicaSet: 'atlas-d2a9k3-shard-0',
          username: 'root',
          password: 'R7tAZsixaP67xN2',
          database: 'ip',
          ssl: true,
          synchronize: true,
          logging: true,
          authSource: 'admin',
        };
      },
    }),
  ],
  controllers: [IpController],
  providers: [IpService],
  exports: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
