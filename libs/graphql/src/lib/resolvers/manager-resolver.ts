import { ManagerService, SchoolService } from '@dilta/embededdb/src/lib/services/database.service';
import { Manager } from '@dilta/models';
import { nestedId } from '@dilta/screwbox';
import { EntityNames } from '@dilta/store';
import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';

/**
 * Graphql don't touch else update query.gql
 *
 * @enum {number}
 */
enum GQL_Manager {
  GET = 'getManager',
  FIND = 'findManagers'
}

@Resolver(capitalize(EntityNames.Manager))
export class ManagerResolver {
  constructor(
    private readonly managerSvc: ManagerService,
    private readonly schSvc: SchoolService
  ) {}

  @Query(GQL_Manager.GET)
  getManagers(obj, args: Partial<Manager>, cxt, info) {
    return this.managerSvc.retrieve$(args);
  }

  @Query(GQL_Manager.FIND)
  findManagers(obj, args: Partial<Manager>, cxt, info) {
    return this.managerSvc.find$(args);
  }

  @ResolveProperty('school')
  school(manager: Manager, args: Partial<Manager>, cxt, info) {
    return this.schSvc.retrieve$({ id: nestedId(manager, 'school') });
  }
}
