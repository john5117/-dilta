import { AuthService, SchoolService, UserService } from '@dilta/embededdb/src/lib/services/database.service';
import { User } from '@dilta/models';
import { nestedId } from '@dilta/screwbox';
import { EntityNames } from '@dilta/store';
import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';

/**
 * Graphql don't touch else update query.gql
 *
 * @enum {number}
 */
enum GQL_USER {
  GET = 'getUser',
  FIND = 'findUsers'
}

@Resolver(capitalize(EntityNames.User))
export class UserResolver {
  constructor(
    private readonly userSvc: UserService,
    private readonly schSvc: SchoolService,
    private readonly authSvc: AuthService
  ) {}

  @Query(GQL_USER.GET)
  getUser(obj, args: Partial<User>, cxt, info) {
    return this.userSvc.retrieve$(args);
  }

  @Query(GQL_USER.FIND)
  findUsers(obj, args: Partial<User>, cxt, info) {
    console.log('findUsers', {
      obj, args, cxt, info
    });
    return this.userSvc.find$(args);
  }

  @ResolveProperty('authId')
  authId(user: User, args: Partial<User>, cxt, info) {
    console.log('authId');
    return this.authSvc
    .retrieve$({ id: nestedId(user, 'authId') })
    .then(this.authSvc.santizeAuth);
  }

  @ResolveProperty('school')
  school(user: User, args: Partial<User>, cxt, info) {
    console.log('school');
    return this.schSvc.retrieve$({ id: nestedId(user, 'school') });
  }
}
