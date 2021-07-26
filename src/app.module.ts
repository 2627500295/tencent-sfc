import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

// import { TypeOrmModule } from '@nestjs/typeorm';

import { CookieParserMiddleware } from './shared/middlewares';

import { HomeModule } from './home';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      envFilePath: [],
      expandVariables: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      load: [],
      isGlobal: true,
    }),

    // TypeORM
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory() {
    //     return {};
    //   },
    // }),

    HomeModule,
  ],
  controllers: [],
  providers: [],
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
