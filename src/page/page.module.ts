import { DynamicModule, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { DowngradeMiddleware } from '../downgrade/downgrade.middleware';
import { DowngradeModule } from '../downgrade/downgrade.module';
import { EntryModule } from '../entry/entry.module';
import { PageController } from './page.controller';

@Module({
  imports: [EntryModule, DowngradeModule],
  controllers: [PageController],
})
export class PageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DowngradeMiddleware).forRoutes(PageController);
  }
}
