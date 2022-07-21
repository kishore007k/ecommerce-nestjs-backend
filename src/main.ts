import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import * as express from "express";
import { join } from "path";
import { graphqlUploadExpress } from "graphql-upload";
import { JwtService } from "@nestjs/jwt";
import { IsVerifiedGuard } from "./guards/isVerified.guard";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Server Static Images from Uploads Folder
  app.use("/uploads", express.static(join(process.cwd(), "uploads")));

  app.useGlobalPipes(new ValidationPipe());

  app.use(graphqlUploadExpress());

  const reflector = app.get(Reflector);
  const jwtService = app.get(JwtService);

  app.useGlobalGuards(new IsVerifiedGuard(jwtService, reflector));

  await app.listen(3000, () => {
    console.log(`
    🚀 Server ready at: http://localhost:3000/graphql
    ⭐️ You can explore UI by opening http://localhost:3000/
    `);
  });
}

bootstrap();
