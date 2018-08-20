import { AuthDetailsNotFondError } from '@dilta/authentication/src';
import { Auth } from '@dilta/models';
import { Injectable } from '@nestjs/common';
import { to } from 'await-to-js';
import { autobind } from 'core-decorators';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt';
import { AUDIENCE, ENCRYPTION_KEY, JWT_ALGORITHM } from '../constants';
import { ClientAuthService } from './auth.service';

const {
  fromExtractors,
  fromBodyField,
  fromAuthHeaderAsBearerToken,
  fromHeader,
  fromUrlQueryParameter
} = passportJwt.ExtractJwt;

/** field to locate the token from query and body */
const TOKEN_FIELD = 'token';
/** field to locate token from headers */
const JWT_HEADER_FIELD = 'JWT_AUTHORIZATION';

const JWT_OPTIONS: passportJwt.StrategyOptions = {
  algorithms: [JWT_ALGORITHM],
  audience: AUDIENCE,
  secretOrKey: ENCRYPTION_KEY,
  issuer: AUDIENCE,
  ignoreExpiration: false,
  jwtFromRequest: fromExtractors([
    fromUrlQueryParameter(TOKEN_FIELD),
    fromBodyField(TOKEN_FIELD),
    fromHeader(JWT_HEADER_FIELD),
    fromAuthHeaderAsBearerToken()
  ])
};

@autobind()
@Injectable()
export class PassportMiddleWareService {
  private passport = passport;

  constructor(private cauth: ClientAuthService) {}

  middleWares(req: Request, res: Response, next: NextFunction) {
    this.passport.initialize()(req, res, next);
    // apply jwt strategy to passport
    this.passport.use('jwt', new passportJwt.Strategy(JWT_OPTIONS, this.jwtToken));
  }


  /**
   * validating jwt token for authentication
   *
   * @param {Auth} payload
   * @param {Function} done
   * @memberof PassportMiddleWareService
   */
  @autobind()
  async jwtToken(payload: Auth, done: Function) {
    const { retrieve$, santizeAuth } = this.cauth.auth;
    let [err, value] = await to(retrieve$({ id: payload.id }));
    err = err ? err : !value ? new AuthDetailsNotFondError() : value;
    value = santizeAuth(value) as any;
    done(err, value);
  }
}
