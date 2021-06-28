import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

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
export class AppModule {}
