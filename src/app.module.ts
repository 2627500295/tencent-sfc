import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { ActuatorModule } from './actuator';

import {
  ResponseTimeMiddleware,
  XPoweredByMiddleware,
  CookieParserMiddleware,
  ConnectRidMiddleware,
} from './shared/middlewares';

// import { ActuatorModule } from './actuator/actuator.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [],
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [],
      isGlobal: true,
    }),

    /**
     * Actuator
     */
    ActuatorModule.forRoot({
      registration: {
        adminServerUrl: '',
        name: 'core',
        serviceUrl: '',
        metadata: {},
      },
    }),

    HomeModule,
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
