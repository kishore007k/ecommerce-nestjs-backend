import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { ProductInput } from "src/dto/input-type/product.dto";
import { Product } from "src/dto/object-type/product.dto";
import { ProductService } from "./product.service";

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  // ✏️ Read by id
  @Query(() => Product, { name: "getProductById" })
  async getProduct(@Args("id") id: string): Promise<Product | CustomError> {
    return this.productService.getProduct(id);
  }

  // ✏️ Read all
  @Query(() => [Product], { name: "getProducts" })
  async getProducts(): Promise<Product[] | CustomError> {
    return this.productService.getProducts();
  }

  // 🔍 FindManyByName
  @Query(() => [Product], { name: "getProductsByTitle" })
  async getProductByName(
    @Args("name") name: string,
  ): Promise<Product[] | CustomError> {
    return this.productService.findProductByName(name);
  }

  // 🔍 FindManyByCategory
  @Query(() => [Product], { name: "getProductsByCategory" })
  async getProductsByCategory(
    @Args("category") category: string,
  ): Promise<Product[] | CustomError> {
    return this.productService.findProductsByCategory(category);
  }

  // 🔍 FindManyByTag
  @Query(() => [Product], { name: "getProductsByTag" })
  async getProductsByTag(
    @Args("tag") tag: string,
  ): Promise<Product[] | CustomError> {
    return this.productService.findProductsByTag(tag);
  }

  // 🔍 FindManyByPrice
  @Query(() => [Product], { name: "getProductsByPrice" })
  async getProductsByPrice(
    @Args("price") price: number,
  ): Promise<Product[] | CustomError> {
    return this.productService.findProductsByPrice(price);
  }

  // 🔍 FindManyPaginated
  @Query(() => [Product], { name: "getProductsPaginated" })
  async getProductsPaginated(
    @Args("name") name: string,
    @Args("skip") skip: number,
    @Args("take") take: number,
  ): Promise<Product[] | CustomError> {
    return this.productService.findProductsByNamePaginated(name, skip, take);
  }

  // 📝 Create
  @Mutation(() => Product, { name: "createProduct" })
  async create(
    @Args("product") product: ProductInput,
  ): Promise<Product | CustomError> {
    return this.productService.create(product);
  }

  // 🏗️ Update
  @Mutation(() => Product, { name: "updateProduct" })
  async update(
    @Args("id") id: string,
    @Args("product") product: ProductInput,
  ): Promise<Product | CustomError> {
    return this.productService.updateProduct(id, product);
  }

  // 🗑️ Delete
  @Mutation(() => CustomResponse, { name: "deleteProduct" })
  async delete(@Args("id") id: string): Promise<CustomResponse | CustomError> {
    return this.productService.deleteProduct(id);
  }
}
