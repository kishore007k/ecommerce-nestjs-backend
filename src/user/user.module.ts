import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { GenerateRandomAliasService } from "src/utils/generate-random-alias.service";
import { GenerateRandomAvatarService } from "src/utils/generate-random-avatar.service";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";

@Module({
  imports: [PrismaModule],
  providers: [
    UserResolver,
    UserService,
    GenerateRandomAliasService,
    GenerateRandomAvatarService,
  ],
  exports: [UserService],
})
export class UserModule {}
