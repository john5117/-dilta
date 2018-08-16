
import { SchoolService } from '@dilta/embededdb/src/lib/services/database.service';
import { School } from '@dilta/models';
import { EntityNames } from '@dilta/store';
import { Query, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';

/**
 * Graphql don't touch else update query.gql
 *
 * @enum {number}
 */
enum GQL_SCHOOL {
  GET = 'getSchool',
  FIND = 'findSchools'
}

@Resolver(capitalize(EntityNames.School))
export class SchoolResolver {
  constructor(
    private readonly schSvc: SchoolService
  ) {}

  @Query(GQL_SCHOOL.GET)
  getSchool(obj, args: Partial<School>, cxt, info) {
    return this.schSvc.retrieve$(args);
  }

  @Query(GQL_SCHOOL.FIND)
  findSchools(obj, args: Partial<School>, cxt, info) {
    return this.schSvc.find$(args);
  }
}
