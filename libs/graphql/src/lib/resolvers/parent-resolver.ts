import { ParentService, SchoolService } from '@dilta/embededdb/src/lib/services/database.service';
import { Parent } from '@dilta/models';
import { nestedId } from '@dilta/screwbox';
import { EntityNames } from '@dilta/store';
import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';

/**
 * Graphql don't touch else update query.gql
 *
 * @enum {number}
 */
enum GQL_PARENT {
  GET = 'getParent',
  FIND = 'findParents'
}

@Resolver(capitalize(EntityNames.Parent))
export class ParentResolver {
  constructor(
    private readonly parentSvc: ParentService,
    private readonly schSvc: SchoolService
  ) {}

  @Query(GQL_PARENT.GET)
  getParent(obj, args: Partial<Parent>, cxt, info) {
    return this.parentSvc.retrieve$(args);
  }

  @Query(GQL_PARENT.FIND)
  findParents(obj, args: Partial<Parent>, cxt, info) {
    return this.parentSvc.find$(args);
  }

  @ResolveProperty('school')
  school(parent: Parent, args: Partial<Parent>, cxt, info) {
    return this.schSvc.retrieve$({ id: nestedId(parent, 'school') });
  }
}
