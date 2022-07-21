import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { TagInput } from "src/dto/input-type/tag.dto";
import { Tag } from "src/dto/object-type/tag.dto";
import { TagService } from "./tag.service";

@Resolver()
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  // Create Tag
  @Mutation(() => Tag, { name: "createTag" })
  async createTag(@Args("tag") tag: TagInput): Promise<Tag | CustomError> {
    return this.tagService.createTag(tag);
  }

  // Read Tag
  @Query(() => Tag, { name: "getTagById" })
  async getTag(@Args("id") id: string): Promise<Tag | CustomError> {
    return this.tagService.getTag(id);
  }

  // Read all Tag
  @Query(() => [Tag], { name: "getTags" })
  async getTags(): Promise<Tag[] | CustomError> {
    return this.tagService.getTags();
  }

  // Delete Tag
  @Mutation(() => CustomResponse, { name: "deleteTag" })
  async deleteTag(
    @Args("id") id: string,
  ): Promise<CustomResponse | CustomError> {
    return this.tagService.deleteTag(id);
  }
}
