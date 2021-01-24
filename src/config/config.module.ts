import { Module } from '@nestjs/common';
import {ConfigService} from './config.service';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`.env.${process.env.BUILD_ENV || 'local'}`),
        }
    ],
    exports: [ConfigService],
})
export class ConfigModule {} {}