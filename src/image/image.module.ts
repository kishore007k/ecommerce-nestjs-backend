import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ImageResolver } from "./image.resolver";
import { ImageService } from "./image.service";

@Module({
  providers: [ImageResolver, ImageService, PrismaService],
})
export class ImageModule {}
