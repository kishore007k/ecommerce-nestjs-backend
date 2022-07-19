import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UserModule,

    // JWT Module
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtService],
})
export class AuthModule {}
