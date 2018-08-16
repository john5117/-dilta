import { AuthController } from '@dilta/authentication/src/lib/server/auth.controller';
import { ClientAuthService } from '@dilta/authentication/src/lib/server/auth.service';
import { JwtStrategy } from '@dilta/authentication/src/lib/server/jwt.service';
import { EmbededDatabaseModule } from '@dilta/embededdb/src';
import { Module } from '@nestjs/common';

@Module({
  imports: [EmbededDatabaseModule],
  providers: [ClientAuthService, JwtStrategy],
  controllers: [ AuthController ]
})
export class ServerAuthenticationModule {}
