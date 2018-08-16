import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import to from 'await-to-js';
import { Strategy } from 'passport-jwt';
import { ClientAuthService } from './auth.service';
import { JwtDecryptingError } from './errors';


// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { AuthService } from './auth.service';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private clientAuthSvc: ClientAuthService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: string, done: Function) {
    const [err, user] = await to(this.clientAuthSvc.decryptToken(payload));
    if (err || !user) {
      return done( (err) ? err :  new JwtDecryptingError(), false);
    }
    done(null, user);
  }


}
