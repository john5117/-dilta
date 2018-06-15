import { Injectable, Inject } from '@angular/core';
import { EntityServiceFactory, EntityServiceBase } from 'ngrx-data';

import { School } from '@dilta/models';
import { UserDBService } from '@dilta/offlinedatabase';
import { Model } from '@dilta/abstract-imp';

import { EntityDataBase } from './entitybase';
import { EntityNames } from './constants';
import { SchoolModel } from '@dilta/offlinedatabase/src/model.tokens';

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
