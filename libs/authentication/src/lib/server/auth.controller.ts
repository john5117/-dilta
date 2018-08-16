import { ClientAuthService, InValidPasswordError } from '@dilta/authentication/src';
import { ApiResponse, failureResponse, successResponse } from '@dilta/authentication/src/lib/shared';
import { Auth } from '@dilta/models';
import { throwError } from '@dilta/screwbox';
import { Body, Controller, Get, Post } from '@nestjs/common';
import to from 'await-to-js';

@Controller('auth')
export class AuthController {
  constructor(private cAuth: ClientAuthService) {}

  @Post('login')
  async login(@Body() auth: Partial<Auth>): Promise<ApiResponse<Auth>> {
    const { santizeAuth, retrieve$ } = this.cAuth.auth;
    try {
      let err: Error;
      let details: Auth;
      let isValid: boolean;
      [err, details] = await to(retrieve$({ username: auth.username }));
      throwError(err);
      [err, isValid] = await to(
        this.cAuth.checkPassword(auth.password, details.password)
      );
      if (err || !isValid) {
        throwError((err) ? err : new InValidPasswordError());
      }
      return successResponse(santizeAuth(details )as any as Auth);
    } catch (err) {
      return failureResponse(err);
    }
  }

  @Post('signup')
  async signUp(@Body() auth: Partial<Auth>) {
    const { santizeAuth, create$ } = this.cAuth.auth;
    try {
      let err: Error;
      [err, auth.password ] = await to(this.cAuth.createHash(auth.password));
      throw(err);
      [err, auth] = await to(create$(auth));
      throwError(err);
      return successResponse(santizeAuth(auth as any as Auth));
    } catch (err) {
      return failureResponse(err);
    }
  }

  @Get('verify')
  verify() {
    throw new Error('unimplemented');
  }
}
