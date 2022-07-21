import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Role } from "src/dto/enum/role";

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(
    @Inject("JwtService")
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;

    const isPublic = this.reflector.get<boolean>(
      "isPublic",
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    if (req.headers && req.headers.Authorization) {
      const token = req.headers.Authorization;

      // Verify JWT
      const isValid = await this.jwtService.verify(token);

      if (!isValid) {
        return false;
      }

      // Decode JWT
      const decoded = this.jwtService.decode(token);

      return decoded["role"] === Role.ADMIN;
    }

    return false;
  }
}
