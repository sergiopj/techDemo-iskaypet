import { NestFactory } from '@nestjs/core';
import { NestAppModule } from './nest-app.module';

async function bootstrap() {
  const app = await NestFactory.create(NestAppModule);
  await app.listen(3001);
}

void bootstrap().catch((error: unknown) => {
  console.error('Failed to start NestJS application:', error);
  process.exitCode = 1;
});