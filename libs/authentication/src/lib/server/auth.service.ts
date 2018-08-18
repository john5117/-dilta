import { successResponse } from '@dilta/authentication/src/lib/shared';
import { AuthService } from '@dilta/embededdb';
import { Auth } from '@dilta/models';
import { throwError } from '@dilta/screwbox';
import { Injectable } from '@nestjs/common';
import { to } from 'await-to-js';
import { compare, genSalt, hash } from 'bcrypt';
import { autobind } from 'core-decorators';
import { sign, verify } from 'jsonwebtoken';
import { AUDIENCE, BCRYPT_HASH_ROUND, ENCRYPTION_KEY, JWT_ALGORITHM } from './constants';

// TODO: implement expirey date
const JWT_OPTIONS = {
  audience: AUDIENCE,
  issuer: AUDIENCE
};

@autobind()
@Injectable()
export class ClientAuthService {
  constructor(public auth: AuthService) {}

  /**
   * clean the auth details and generate jwt token
   *
   * @param {Auth} details
   * @returns
   * @memberof ClientAuthService
   */
  async cleanAndGenerateToken(details: Auth) {
    const { santizeAuth } = this.auth;
    details = (santizeAuth(details) as any) as Auth;
    const [err, token] = await to(this.createToken(details));
    throwError(err);
    return successResponse({ token, details } as any);
  }

  /** saves the user authentication */
  async save(auth: Auth) {
    let err: Error;
    let password: string;
    [err, password] = await to(this.createHash(auth.password));
    throwError(err);
    auth.password = password;
    [err, auth] = await to(this.auth.create$(auth));
    throwError(err);
    return auth;
  }

  /** create hash for the password */
  async createHash(password: string) {
    const [saltErr, salt] = await to(genSalt(BCRYPT_HASH_ROUND));
    throwError(saltErr);
    const [err, hashes] = await to(hash(password, salt));
    throwError(err);
    return hashes;
  }

  /** validates the user password */
  async checkPassword(password: string, hashed: string) {
    const [err, isValid] = await to(compare(password, hashed));
    throwError(err);
    return isValid;
  }

  /** creates token for the user */
  async createToken(auth: Auth) {
    const config = {
      algorithm: JWT_ALGORITHM
    };
    return new Promise<string>((resolve, reject) => {
      sign(auth, ENCRYPTION_KEY, config, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    });
  }

  /** decodes the token to vaild Auth Object */
  decryptToken(token: string) {
    const config = {
      algorithms: JWT_ALGORITHM
    } as any;
    return new Promise((resolve, reject) => {
      verify(token, ENCRYPTION_KEY, config, (err, value) => {
        if (err) {
          return reject(err);
        }
        resolve((value as any) as Partial<Auth>);
      });
    });
  }
}
