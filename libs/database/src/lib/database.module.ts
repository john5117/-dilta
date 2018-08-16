import { EmbededDatabaseModule } from '@dilta/embededdb/src/lib/embededdb.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [EmbededDatabaseModule],
  exports: [EmbededDatabaseModule]
})
export class DatabaseModule {}
