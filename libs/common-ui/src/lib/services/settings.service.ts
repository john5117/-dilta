import { Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { createSetting, deleteSetting, findSettings, getSetting, updateSetting } from '@dilta/commonwebui/src/lib/services/graphql';
import { Setting } from '@dilta/models';
import { UtilService } from '@dilta/util';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable()
export class DreamSettingService implements Model<Setting> {
  constructor(private apollo: Apollo, private util: UtilService) {}

  retrieve$(id: string) {
    return this.apollo
      .query<Setting>(getSetting(id))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  find$(query: Partial<Setting>) {
    return this.apollo
      .query<Setting[]>(findSettings(query))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  create$(update: Partial<Setting>) {
    return this.apollo
      .mutate<Setting>(createSetting(update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<Setting>(res)));
  }

  update$(update: Partial<Setting>) {
    return this.apollo
      .mutate<Setting>(updateSetting(update.id, update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<Setting>(res)));
  }

  delete$(id: string) {
    return this.apollo
      .mutate<boolean>(deleteSetting(id))
      .pipe(map(this.util.cleanApolloMutationResponse));
  }
}
