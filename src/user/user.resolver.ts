import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { User } from "src/dto/object-type/user.dto";
import { UserService } from "./user.service";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { CustomResponse } from "src/dto/custom-response.dto";
import { slugify } from "transliteration";
import { UserInput } from "src/dto/input-type/user.dto";

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

  @Mutation(() => User)
  async updateUser(
    @Args("id") id: string,
    @Args("user") user: UserInput,
  ): Promise<User | CustomError> {
    return await this.userService.updateUser(id, user);
  }

  @Mutation(() => CustomResponse)
  async uploadFile(
    @Args("id") id: string,
    @Args({ name: "file", type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<CustomResponse | CustomError> {
    // Get user by id
    const user = await this.userService.getUser(id);

    // If user not found return error
    if (user instanceof CustomError) {
      return user;
    }

    // Create new file name
    const newFileName = `${slugify(id)}-${slugify(user.name)}.jpg`;

    // Create write stream
    const isUploaded = await this.userService.uploadImage(
      createReadStream,
      newFileName,
      user.email,
    );

    // If file not uploaded return error
    if (isUploaded instanceof CustomError) {
      return {
        message: "Upload failed",
        statusCode: 500,
      };
    }

    // Create the path to the file
    const imageUri = `${process.env.IMAGE_UPLOADER_URL}/${user.email}/${newFileName}`;

    // Update user image
    await this.userService.updateUserImage(id, imageUri);

    return {
      message: "Upload success",
      statusCode: 200,
    };
  }

  @Mutation(() => CustomResponse)
  async deleteUser(
    @Args("id") id: string,
  ): Promise<CustomResponse | CustomError> {
    return await this.userService.deleteUser(id);
  }
}
