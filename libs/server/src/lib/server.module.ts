import { ServerAuthenticationModule } from '@dilta/authentication/src';
import { GraphqlModule } from '@dilta/graphql/src';
import { Module } from '@nestjs/common';
import { AppController } from './server.component';
import { AppService } from './server.service';

@Module({
  imports: [GraphqlModule, ServerAuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class ServerAppModule {}
