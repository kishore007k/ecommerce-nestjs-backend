import { Injectable } from "@nestjs/common";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { ProductInput } from "src/dto/input-type/product.dto";
import { Product } from "src/dto/object-type/product.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  // 📝 Create
  create = async (data: ProductInput): Promise<Product | CustomError> => {
    try {
      const product = await this.prismaService.product.create({
        data,
      });

      return product;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // ✏️ Read by id
  getProduct = async (id: string): Promise<Product | CustomError> => {
    try {
      const product = await this.prismaService.product.findFirst({
        where: {
          id,
        },
      });

      return product;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // ✏️ Read all
  getProducts = async (): Promise<Product[] | CustomError> => {
    try {
      const products = await this.prismaService.product.findMany({
        include: {
          orderProducts: true,
          reviews: true,
        },
      });

      return products;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🏗️ Update
  updateProduct = async (
    id: string,
    data: ProductInput,
  ): Promise<Product | CustomError> => {
    try {
      const product = await this.prismaService.product.update({
        where: {
          id,
        },
        data,
      });

      if (data.tagId !== "") {
        const tag = await this.prismaService.tag.update({
          where: {
            id: data.tagId,
          },
          data: {
            products: {
              connect: {
                id,
              },
            },
          },
          include: {
            products: true,
          },
        });

        console.log("tag", tag);
      }

      if (data.categoryId !== "") {
        const category = await this.prismaService.category.update({
          where: {
            id: data.categoryId,
          },
          data: {
            products: {
              connect: {
                id,
              },
            },
          },
          include: {
            products: true,
          },
        });

        console.log("category", category);
      }

      return product;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🗑️ Delete
  deleteProduct = async (id: string): Promise<CustomResponse | CustomError> => {
    try {
      const product = await this.prismaService.product.delete({
        where: {
          id,
        },
      });

      if (!product) {
        return {
          message: "Product not found",
          statusCode: 404,
        };
      }

      return {
        message: "Product deleted successfully",
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🔎 Search
  searchProduct = async (search: string): Promise<Product[] | CustomError> => {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        },
      });

      return products;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🔍 FindOne by name
  findProductByName = async (
    name: string,
  ): Promise<Product[] | CustomError> => {
    try {
      const product = await this.prismaService.product.findMany({
        where: {
          name,
        },
      });

      return product;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🔍 FindMany
  findProductsByName = async (
    name: string,
  ): Promise<Product[] | CustomError> => {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          name,
        },
      });

      return products;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🔍 FindManyPaginated
  findProductsByNamePaginated = async (
    name: string,
    skip: number,
    take: number,
  ): Promise<Product[] | CustomError> => {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          name,
        },
        skip,
        take,
      });

      return products;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🔍 FindManyByCategory
  findProductsByCategory = async (
    category: string,
  ): Promise<Product[] | CustomError> => {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          category: {
            category,
          },
        },
      });

      return products;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🔍 FindManyByTag
  findProductsByTag = async (tag: string): Promise<Product[] | CustomError> => {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          tagId: tag,
        },
      });

      return products;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // 🔍 FindManyByPrice
  findProductsByPrice = async (
    price: number,
  ): Promise<Product[] | CustomError> => {
    try {
      const products = await this.prismaService.product.findMany({
        where: {
          price,
        },
      });

      return products;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };
}
