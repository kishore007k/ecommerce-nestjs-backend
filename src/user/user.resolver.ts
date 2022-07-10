import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { User } from "src/dto/object-type/user.dto";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: "getAllUsers" })
  async getAll(): Promise<User[] | CustomError> {
    return await this.userService.getUsers();
  }

  @Query(() => User, { name: "getUser" })
  async getOne(@Args("id") id: string): Promise<User | CustomError> {
    return await this.userService.getUser(id);
  }

  @Mutation(() => User, { name: "createUser" })
  async create(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<User | CustomError> {
    return await this.userService.createUser({ email, password });
  }
}
