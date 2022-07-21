import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { CategoryInput } from "src/dto/input-type/category.dto";
import { Category } from "src/dto/object-type/category.dto";
import { CategoryService } from "./category.service";

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  // Create Category
  @Mutation(() => Category, { name: "createCategory" })
  async createCategory(
    @Args("category") category: CategoryInput,
  ): Promise<Category | CustomError> {
    return this.categoryService.createCategory(category);
  }

  // Read Category
  @Query(() => Category, { name: "getCategoryById" })
  async getCategory(@Args("id") id: string): Promise<Category | CustomError> {
    return this.categoryService.getCategory(id);
  }

  // Read all Category
  @Query(() => [Category], { name: "getCategories" })
  async getCategories(): Promise<Category[] | CustomError> {
    return this.categoryService.getCategories();
  }

  // Delete Category
  @Mutation(() => CustomResponse, { name: "deleteCategory" })
  async deleteCategory(
    @Args("id") id: string,
  ): Promise<CustomResponse | CustomError> {
    return this.categoryService.deleteCategory(id);
  }
}
