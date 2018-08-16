import { DatabaseModule } from '@dilta/database/src';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import * as expressGraphql from 'express-graphql';
import { AuthResolver } from './resolvers/auth-resolver';
import { ExpenseResolver } from './resolvers/expense-resolver';
import { ManagerResolver } from './resolvers/manager-resolver';
import { ParentResolver } from './resolvers/parent-resolver';
import { ReceiptResolver } from './resolvers/receipt-resolver';
import { SchoolResolver } from './resolvers/school-resolver';
import { ScoreResolver } from './resolvers/score-resolver';
import { StudentResolver } from './resolvers/student-resolver';
import { UserResolver } from './resolvers/user-resolver';

@Module({
  imports: [DatabaseModule, GraphQLModule],
  providers: [
    AuthResolver,
    ExpenseResolver,
    ManagerResolver,
    ParentResolver,
    ReceiptResolver,
    SchoolResolver,
    ScoreResolver,
    StudentResolver,
    UserResolver
  ]
})
export class GraphqlModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewareConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.gql');
    // console.log(typeDefs);
    const schema = this.graphQLFactory.createSchema({ typeDefs });
    consumer
      .apply(expressGraphql({ schema, graphiql: true,  }))
      .forRoutes('/graphql');
  }
}

