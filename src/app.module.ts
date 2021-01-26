import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './logical/auth/auth.module';
import {UserController} from "./user/user.controller";
import { CommodityService } from './commodity/commodity.service';
import { CommodityController } from './commodity/commodity.controller';
import { PageModule } from './page/page.module';
import { EntryModule } from './entry/entry.module';
import { DowngradeModule } from './downgrade/downgrade.module';
import { Config1Module } from './config1/config.module';

@Module({
  imports: [Config1Module,TestModule,ConfigModule, UserModule, AuthModule,PageModule,
    EntryModule,
    DowngradeModule,],
  controllers: [UserController, CommodityController],
  providers: [AppService, CommodityService],
})
export class AppModule {}
