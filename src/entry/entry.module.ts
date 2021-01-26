import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';

@Module({
  imports: [],
  providers: [EntryService],
  exports: [EntryService],
})
export class EntryModule {}
