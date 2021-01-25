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


@Module({
  imports: [TestModule,ConfigModule, UserModule, AuthModule],
  controllers: [AppController,UserController, CommodityController],
  providers: [AppService, CommodityService],
})
export class AppModule {}
