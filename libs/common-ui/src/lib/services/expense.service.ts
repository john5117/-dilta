import { Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { createExpense, deleteExpense, findExpenses, getExpense, updateExpense } from '@dilta/commonwebui/src/lib/services/graphql';
import { Expense } from '@dilta/models';
import { UtilService } from '@dilta/util';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable()
export class DreamExpenseService implements Model<Expense> {
  constructor(private apollo: Apollo, private util: UtilService) {}

  retrieve$(id: string) {
    return this.apollo
      .query<Expense>(getExpense(id))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  find$(query: Partial<Expense>) {
    return this.apollo
      .query<Expense[]>(findExpenses(query))
      .pipe(map(this.util.cleanApolloQueryResponse));
  }

  create$(update: Partial<Expense>) {
    return this.apollo
      .mutate<Expense>(createExpense(update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<Expense>(res)));
  }

  update$(update: Partial<Expense>) {
    return this.apollo
      .mutate<Expense>(updateExpense(update.id, update))
      .pipe(map(res => this.util.cleanApolloMutationResponse<Expense>(res)));
  }

  delete$(id: string) {
    return this.apollo
      .mutate<boolean>(deleteExpense(id))
      .pipe(map(this.util.cleanApolloMutationResponse));
  }
}
