import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { LoginResponse } from "src/dto/login-response.dto";
import { Public } from "src/utils/public.decorator";
import { AuthService } from "./auth.service";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => CustomResponse)
  async signup(
    @Args("email") email: string,
    @Args("password") password: string,
    @Args("confirmPassword") confirmPassword: string,
  ): Promise<CustomResponse> {
    return await this.authService.signup(email, password, confirmPassword);
  }

  @Public()
  @Mutation(() => LoginResponse)
  async login(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<LoginResponse | CustomError> {
    return await this.authService.login(email, password);
  }
}
