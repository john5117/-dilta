import { ServerAppModule } from '@dilta/server/src';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const SERVER_PORT = process.env.PORT;

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ServerAppModule);
  if (app) {
    console.log(`server started on: localhost:${SERVER_PORT}`);
  }
  await app.listen(SERVER_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
