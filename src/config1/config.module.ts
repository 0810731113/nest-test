import { Module } from '@nestjs/common';
import { ConfigModule as ConfigBaseModule } from '@nestjs/config';

import { ssrConfig } from './ssr.config';

@Module({
  imports: [
    ConfigBaseModule.forRoot({
      envFilePath: [`.env.${process.env.ENVIRONMENT}`, '.env'], // 先加载 APP_RUNTIME_ENV env, 再加载默认 env
      load: [ssrConfig],
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
  ],
})
export class Config1Module {}
