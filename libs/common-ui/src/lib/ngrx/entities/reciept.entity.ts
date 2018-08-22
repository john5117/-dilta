import { Injectable } from '@angular/core';
import { DreamReceiptService } from '@dilta/commonwebui/src/lib/services';
import { Receipt } from '@dilta/models';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from './constants';
import { EntityDataBase } from './entitybase';

/**
 * Service thst instantite both the creation of the entity
 * and the effects
 *
 * @export
 * @class ReceiptDataService
 * @extends {EntityDataBase<Receipt>}
 */
@Injectable()
export class ReceiptEntityGQLService extends EntityDataBase<Receipt> {
  constructor(service: DreamReceiptService) {
    super(EntityNames.Receipt, service);
  }

}

/**
 * Service responsible for creating Receipt Entity
 *
 * @export
 * @class ReceiptService
 * @extends {EntityServiceBase<Receipt>}
 */
@Injectable()
export class ReceiptEntityService extends EntityServiceBase<Receipt> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Receipt, entityServiceFactory);
  }
}
