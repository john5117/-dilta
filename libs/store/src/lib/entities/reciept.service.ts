import { Inject, Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { Receipt } from '@dilta/models';
import { RecieptModel } from '@dilta/offlinedatabase/src/lib/model.tokens';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from '@dilta/store/src/lib/entities/constants';
import { EntityDataBase } from '@dilta/store/src/lib/entities/entitybase';

@Injectable()
export class ReceiptDataService extends EntityDataBase<Receipt> {
  constructor(@Inject(RecieptModel) service: Model<Receipt>) {
    super(EntityNames.Receipt, service);
  }
}

@Injectable()
export class ReceiptService extends EntityServiceBase<Receipt> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Receipt, entityServiceFactory);
  }
}
