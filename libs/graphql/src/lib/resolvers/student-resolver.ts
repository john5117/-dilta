import { SchoolService, StudentService, UserService } from '@dilta/embededdb/src/lib/services/database.service';
import { Student } from '@dilta/models';
import { nestedId } from '@dilta/screwbox';
import { EntityNames } from '@dilta/store';
import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';

/**
 * Graphql don't touch else update query.gql
 *
 * @enum {number}
 */
enum GQL_STUDENT {
  GET = 'getStudent',
  FIND = 'findStudents'
}

@Resolver(capitalize(EntityNames.Student))
export class StudentResolver {
  constructor(
    private readonly studSvc: StudentService,
    private readonly schSvc: SchoolService,
    private readonly userSvc: UserService
  ) {}

  @Query(GQL_STUDENT.GET)
  getStudent(obj, args: Partial<Student>, cxt, info) {
    return this.studSvc.retrieve$(args);
  }

  @Query(GQL_STUDENT.FIND)
  findStudents(obj, args: Partial<Student>, cxt, info) {
    return this.studSvc.find$(args);
  }

  @ResolveProperty('parentPhone')
  parentPhone(student: Student, args: Partial<Student>, cxt, info) {
    return this.userSvc.retrieve$({ id: nestedId(student, 'parentPhone') });
  }

  @ResolveProperty('school')
  school(student: Student, args: Partial<Student>, cxt, info) {
    return this.schSvc.retrieve$({ id: nestedId(student, 'school') });
  }
}
