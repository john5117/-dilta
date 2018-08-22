import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiResponse } from '@dilta/authentication/src/lib/shared';
import { School } from '@dilta/models';
import { AppConfigToken, AppConfiguration } from '@dilta/platform-config/src';
import { UtilService } from '@dilta/util';
import { map } from 'rxjs/operators';

@Injectable()
export class SchoolService {
  constructor(
    @Inject(AppConfigToken) private config: AppConfiguration,
    private http: HttpClient,
    private util: UtilService
  ) {}

  /**
   * retrieve current school
   *
   * @returns
   * @memberof SchoolService
   */
  currentSchool() {
    return this.http
      .get<ApiResponse<School>>(`${this.config.baseUrl}/electron/school`)
      .pipe(map(this.util.cleanApiResponse));
  }
}
