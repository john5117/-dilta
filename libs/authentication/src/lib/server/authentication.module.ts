import { AuthController } from '@dilta/authentication/src/lib/server/auth.controller';
import { ClientAuthService } from '@dilta/authentication/src/lib/server/auth.service';
import { DatabaseModule } from '@dilta/database/src';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  providers: [ClientAuthService],
  controllers: [AuthController]
})
export class ServerAuthenticationModule {}
