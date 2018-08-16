import { ServerAppModule } from '@dilta/server/src';
import { NestFactory } from '@nestjs/core';


declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ServerAppModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
