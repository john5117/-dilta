import { AuthService, SchoolService, UserService } from '@dilta/embededdb/src/lib/services/database.service';
import { Auth } from '@dilta/models';
import { nestedId } from '@dilta/screwbox';
import { EntityNames } from '@dilta/store';
import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';


/**
 * Dont touch else update the query.gql
 *
 * @enum {number}
 */
enum GQL_AUTH {
  GET = 'getAuth',
  FIND = 'findAuths'
}


@Resolver(capitalize(EntityNames.Auth))
export class AuthResolver {

  constructor(
    private readonly authSvc: AuthService,
    private readonly userSvc: UserService,
    private readonly schSvc: SchoolService
  ) {}

  @Query(GQL_AUTH.GET)
  getAuth(obj, args: Partial<Auth>, cxt, info) {
    return this.authSvc.retrieve$(args)
      .then(this.authSvc.santizeAuth);
  }

  @Query(GQL_AUTH.FIND)
  findAuths(obj, args: Partial<Auth>, cxt, info) {
    return this.authSvc
      .find$(args)
      .then(auths => auths.map(this.authSvc.santizeAuth));
  }

  @ResolveProperty('biodata')
  biodata(auth: Partial<Auth>, args: Partial<Auth>, cxt, info) {
    return this.userSvc.retrieve$({ authId: auth.id });
  }

  @ResolveProperty('school')
  school(auth: Auth, args: Partial<Auth>, cxt, info) {
    const id = nestedId(auth, 'school');
    return this.schSvc.retrieve$({ id });
  }
}
