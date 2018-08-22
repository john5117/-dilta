import { Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { createManager, deleteManager, findManagers, getManager, updateManager } from '@dilta/commonwebui/src/lib/services/graphql';
import { Manager } from '@dilta/models';
import { UtilService } from '@dilta/util';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable()
export class DreamManagerService implements Model<Manager> {
  constructor(private apollo: Apollo, private util: UtilService) {}

  retrieve$(id: string) {
    return this.apollo
      .query<Manager>(getManager(id))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  find$(query: Partial<Manager>) {
    return this.apollo
      .query<Manager[]>(findManagers(query))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  create$(update: Partial<Manager>) {
    return this.apollo
      .mutate<Manager>(createManager(update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<Manager>(res)));
  }

  update$(update: Partial<Manager>) {
    return this.apollo
      .mutate<Manager>(updateManager(update.id, update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<Manager>(res)));
  }

  delete$(id: string) {
    return this.apollo
      .mutate<boolean>(deleteManager(id))
      .pipe(map(this.util.cleanApolloMutationResponse));
  }
}
