import { Module } from '@nestjs/common';
import { rxServices } from './services/database.service';



// Embeded
@Module({
  providers: [...rxServices],
  exports: [...rxServices]
})
export class EmbededDatabaseModule {}
