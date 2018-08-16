import { ExpenseService, SchoolService, UserService } from '@dilta/embededdb/src/lib/services/database.service';
import { Expense } from '@dilta/models';
import { nestedId } from '@dilta/screwbox';
import { EntityNames } from '@dilta/store';
import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';


/**
 * Graphql don't touch else update query.gql
 *
 * @enum {number}
 */
enum GQL_EXPENSE {
  GET = 'getExpense',
  FIND = 'findExpenses'
}

@Resolver(capitalize(EntityNames.Expense))
export class ExpenseResolver {
  constructor(
    private readonly expenseSvc: ExpenseService,
    private readonly userSvc: UserService,
    private readonly schSvc: SchoolService
  ) {}

  @Query(GQL_EXPENSE.GET)
  getExpense(obj, args: Partial<Expense>, cxt, info) {
    return this.expenseSvc.retrieve$(args);
  }

  @Query(GQL_EXPENSE.FIND)
  findExpenses(obj, args: Partial<Expense>, cxt, info) {
    return this.expenseSvc.find$(args);
  }

  @ResolveProperty('busarId')
  busarId(expense: Expense, args: Partial<Expense>, cxt, info) {
    return this.userSvc.retrieve$({ id: nestedId(expense, 'busarId') });
  }

  @ResolveProperty('school')
  school(expense: Expense, args: Partial<Expense>, cxt, info) {
    return this.schSvc.retrieve$({ id: nestedId(expense, 'school') });
  }
}
