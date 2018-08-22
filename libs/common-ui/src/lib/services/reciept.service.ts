import { Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { Receipt } from '@dilta/models';
import { UtilService } from '@dilta/util';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { createReceipt, deleteReceipt, findReceipts, getReceipt, updateReceipt } from './graphql';

@Injectable()
export class DreamReceiptService implements Model<Receipt> {
  constructor(private apollo: Apollo, private util: UtilService) {}

  retrieve$(id: string) {
    return this.apollo
      .query<Receipt>(getReceipt(id))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  find$(query: Partial<Receipt>) {
    return this.apollo
      .query<Receipt[]>(findReceipts(query))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  create$(update: Partial<Receipt>) {
    return this.apollo
      .mutate<Receipt>(createReceipt(update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<Receipt>(res)));
  }

  update$(update: Partial<Receipt>) {
    return this.apollo
      .mutate<Receipt>(updateReceipt(update.id, update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<Receipt>(res)));
  }

  delete$(id: string) {
    return this.apollo
      .mutate<boolean>(deleteReceipt(id))
      .pipe(map(this.util.cleanApolloMutationResponse));
  }
}
