import { SchoolService, ScoreService, StudentService, UserService } from '@dilta/embededdb/src/lib/services/database.service';
import { Score } from '@dilta/models';
import { EntityNames } from '@dilta/store';
import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { capitalize } from 'lodash';
import { nestedId } from '@dilta/screwbox';

/**
 * Graphql don't touch else update query.gql
 *
 * @enum {number}
 */
enum GQL_SCORE {
  GET = 'getScore',
  FIND = 'findScores'
}

@Resolver(capitalize(EntityNames.Score))
export class ScoreResolver {
  constructor(
    private readonly scoreSvc: ScoreService,
    private readonly schSvc: SchoolService,
    private readonly userSvc: UserService,
    private readonly studSvc: StudentService
  ) {}

  @Query(GQL_SCORE.GET)
  getScore(obj, args: Partial<Score>, cxt, info) {
    return this.scoreSvc.retrieve$(args);
  }

  @Query(GQL_SCORE.FIND)
  findScores(obj, args: Partial<Score>, cxt, info) {
    return this.scoreSvc.find$(args);
  }

  @ResolveProperty('teacherId')
  teacherId(score: Score, args: Partial<Score>, cxt, info) {
    return this.userSvc.retrieve$({ id: nestedId(score, 'teacherId') });
  }

  @ResolveProperty('studentId')
  studentId(score: Score, args: Partial<Score>, cxt, info) {
    return this.studSvc.retrieve$({ id: nestedId(score, 'studentId') });
  }

  @ResolveProperty('school')
  school(score: Score, args: Partial<Score>, cxt, info) {
    return this.schSvc.retrieve$({ id: nestedId(score, 'studentId') });
  }
}
