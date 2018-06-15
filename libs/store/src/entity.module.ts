import { NgModule } from '@angular/core';
import { EntityDataService, EntityMetadataMap } from 'ngrx-data';
import { AuthDataService, AuthService } from './auth.service';
import { DataServicesModule } from './data.module';
import { ManagerDataService, ManagerService } from './manager.service';
import { SchoolDataService, SchoolService } from './school.service';
import { UserDataService, UserService } from './users.service';

export const entityMetadata: EntityMetadataMap = {
  user: {},
  school: {},
  manager: {},
  auth: {}
};

export const providers = [
  UserService,
  SchoolService,
  ManagerService,
  AuthService
];

@NgModule({
  imports: [DataServicesModule],
  providers
})
export class EntityServicesModule {
  constructor(
    private eds: EntityDataService,
    auth: AuthDataService,
    manager: ManagerDataService,
    school: SchoolDataService,
    user: UserDataService
  ) {
    eds.registerServices({
      auth,
      user,
      manager,
      school
    });
  }
}
