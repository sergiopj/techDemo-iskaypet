import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestAppModule } from "./nest-app.module";

async function bootstrap() {
  const app = await NestFactory.create(NestAppModule);
  app.setGlobalPrefix("api/v1");

  const config = new DocumentBuilder()
    .setTitle("Animal Clinic API")
    .setDescription("HTTP API for the animal clinic backend")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, { useGlobalPrefix: true });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

void bootstrap().catch((error: unknown) => {
  console.error("Failed to start NestJS application:", error);
  process.exitCode = 1;
});
