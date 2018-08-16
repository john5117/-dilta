import { ReceiptService, SchoolService } from '@dilta/embededdb/src/lib/services/database.service';
import { Receipt } from '@dilta/models';
import { nestedId } from '@dilta/screwbox';
import { EntityNames } from '@dilta/store';
import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';

/**
 * Graphql don't touch else update query.gql
 *
 * @enum {number}
 */
enum GQL_RECEIPT {
  GET = 'getReceipt',
  FIND = 'findReceipts'
}

@Resolver(capitalize(EntityNames.Receipt))
export class ReceiptResolver {
  constructor(
    private readonly recpSvc: ReceiptService,
    private readonly schSvc: SchoolService,
  ) {}

  @Query(GQL_RECEIPT.GET)
  getReceipt(obj, args: Partial<Receipt>, cxt, info) {
    return this.recpSvc.retrieve$(args);
  }

  @Query(GQL_RECEIPT.FIND)
  findReceipts(obj, args: Partial<Receipt>, cxt, info) {
    return this.recpSvc.find$(args);
  }

  @ResolveProperty('teacherId')
  teacherId(receipt: Receipt, args: Partial<Receipt>, cxt, info) {
    return this.schSvc.retrieve$({ id: nestedId(receipt, 'teacherId') });
  }

  @ResolveProperty('studentId')
  studentId(receipt: Receipt, args: Partial<Receipt>, cxt, info) {
    return this.schSvc.retrieve$({ id: nestedId(receipt, 'studentId') });
  }

  @ResolveProperty('school')
  school(receipt: Receipt, args: Partial<Receipt>, cxt, info) {
    return this.schSvc.retrieve$({ id: nestedId(receipt, 'studentId') });
  }
}
