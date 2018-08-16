import { Inject, Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { Setting } from '@dilta/models';
import { SettingModel } from '@dilta/offlinedatabase/src/lib/model.tokens';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from '@dilta/store/src/lib/entities/constants';
import { EntityDataBase } from '@dilta/store/src/lib/entities/entitybase';

@Injectable()
export class SettingDataService extends EntityDataBase<Setting> {
  constructor(@Inject(SettingModel) service: Model<Setting>) {
    super(EntityNames.Setting, service);
  }
}

@Injectable()
export class SettingService extends EntityServiceBase<Setting> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.Setting, entityServiceFactory);
  }
}
