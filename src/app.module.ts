import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import {
  ResponseTimeMiddleware,
  XPoweredByMiddleware,
  CookieParserMiddleware,
  ConnectRidMiddleware,
} from './shared/middlewares';

import { ActuatorModule } from './actuator/actuator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [],
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [],
      isGlobal: true,
    }),
    ActuatorModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        XPoweredByMiddleware,
        ResponseTimeMiddleware,
        CookieParserMiddleware,
        ConnectRidMiddleware
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
