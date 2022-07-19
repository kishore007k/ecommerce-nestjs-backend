import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () => {
    console.log(`
    🚀 Server ready at: http://localhost:3000/graphql
    ⭐️ You can explore UI by opening http://localhost:3000/
    `);
  });
}

bootstrap();
