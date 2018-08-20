import { AuthDetailsNotFondError, InValidPasswordError } from '@dilta/authentication/src';
import { ApiResponse, failureResponse } from '@dilta/authentication/src/lib/shared';
import { AuthService } from '@dilta/embededdb/src';
import { Auth } from '@dilta/models';
import { throwError } from '@dilta/screwbox';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import to from 'await-to-js';
import { ClientAuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private cAuth: ClientAuthService, private auth: AuthService) {}

  /**
   * signs in the user and respons with jwt token
   *
   * @param {Partial<Auth>} auth
   * @returns {Promise<ApiResponse<Auth>>}
   * @memberof AuthController
   */
  @Post('login')
  async login(@Body() auth: Partial<Auth>): Promise<ApiResponse<Auth>> {
    const { retrieve$ } = this.auth;
    const { cleanAndGenerateToken } = this.cAuth;
    try {
      let err: Error;
      let details: Auth;
      let isValid: boolean;
      let response: any;

      [err, details] = await to(retrieve$({ username: auth.username }));
      throwError(err);
      throwError(!details ? new AuthDetailsNotFondError() : null);
      [err, isValid] = await to(
        this.cAuth.checkPassword(auth.password, details.password)
      );
      if (err || !isValid) {
        throwError(err ? err : new InValidPasswordError());
      }
      [err, response] = await to(cleanAndGenerateToken(details));
      return response;
    } catch (err) {
      return failureResponse(err);
    }
  }

  /**
   * signup the user and respons with jwt token
   *
   * @param {Partial<Auth>} auth
   * @returns
   * @memberof AuthController
   */
  @Post('signup')
  async signUp(@Body() auth: Partial<Auth>) {
    const { cleanAndGenerateToken, save } = this.cAuth;
    try {
      let err: Error;
      let response: any;
      [err, auth] = await to(save(auth as any));
      throwError(err);
      [err, response] = await to(cleanAndGenerateToken(auth as any));
      throwError(err);
      return response;
    } catch (err) {
      return failureResponse(err);
    }
  }

  /**
   * verifies the jwt token and return the decrypted details
   *
   * @param {string} token
   * @returns
   * @memberof AuthController
   */
  @Get('verify')
  async verify(@Query('token') token: string) {
    const { decryptToken, cleanAndGenerateToken } = this.cAuth;
    try {
      let details: any;
      let err: Error;
      let response: any;
      [err, details] = await to(decryptToken(token));
      throwError(err);
      [err, response] = await to(cleanAndGenerateToken(details as any));
      throwError(err);
      return response;
    } catch (err) {
      return failureResponse(err);
    }
  }
}
