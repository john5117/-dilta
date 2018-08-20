import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiResponse } from '@dilta/authentication/src/lib/shared';
import { Auth } from '@dilta/models';
import { AppConfiguration } from '@dilta/platform-config/src/lib/shared';
import { AppConfigToken } from '@dilta/platform-config/src/lib/web-client/web-config.service';
import { UtilService } from '@dilta/util';
import { map } from 'rxjs/operators';
import { Login } from '../ngrx';

@Injectable()
export class ClientAuthService {
  constructor(
   @Inject(AppConfigToken) private config: AppConfiguration,
    private http: HttpClient,
    private util: UtilService
  ) {}

  /** api request to login */
  login(details: Login) {
    return this.http
      .post<ApiResponse<Auth>>(`${this.config.baseUrl}/auth/login`, details)
      .pipe(map(this.util.cleanApiResponse));
  }

  /** api request to sing user up */
  signup(details: Partial<Auth>) {
    return this.http
      .post<ApiResponse<Auth>>(`${this.config.baseUrl}/auth/login`, details)
      .pipe(map(this.util.cleanApiResponse));
  }

  /** verifys the user the token if valid */
  verify(token: string) {
    return this.http
      .get(`${this.config.baseUrl}/auth/verify`, { params: { token } })
      .pipe(map(this.util.cleanApiResponse));
  }
}
