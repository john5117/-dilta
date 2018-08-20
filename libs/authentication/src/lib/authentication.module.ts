import { DatabaseModule } from '@dilta/database/src';
import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { AUTH_API_ROUTE } from './constants';
import { AuthController } from './controllers/auth.controller';
import { ClientAuthService } from './services/auth.service';
import { PassportMiddleWareService } from './services/passport';

@Module({
  imports: [DatabaseModule],
  providers: [ClientAuthService, PassportMiddleWareService],
  controllers: [AuthController],
  exports: [PassportMiddleWareService]
})
export class ServerAuthenticationModule implements NestModule {
  constructor(private pms: PassportMiddleWareService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(this.pms.middleWares).exclude(AUTH_API_ROUTE);
  }
}
