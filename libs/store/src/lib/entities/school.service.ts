import { Inject, Injectable } from '@angular/core';
import { Model } from '@dilta/abstract-imp';
import { School } from '@dilta/models';
import { SchoolModel } from '@dilta/offlinedatabase/src/lib/model.tokens';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';
import { EntityNames } from '@dilta/store/src/lib/entities/constants';
import { EntityDataBase } from '@dilta/store/src/lib/entities/entitybase';

@Injectable()
export class SchoolDataService extends EntityDataBase<School> {
  constructor(@Inject(SchoolModel) service: Model<School>) {
    super(EntityNames.School, service);
  }
}

@Injectable()
export class SchoolService extends EntityServiceBase<School> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    super(EntityNames.School, entityServiceFactory);
  }
}
