import { Injectable } from "@nestjs/common";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { CategoryInput } from "src/dto/input-type/category.dto";
import { Category } from "src/dto/object-type/category.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create Category
  createCategory = async (
    data: CategoryInput,
  ): Promise<Category | CustomError> => {
    try {
      const category = await this.prismaService.category.create({
        data,
      });

      return category;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // Read Category
  getCategory = async (id: string): Promise<Category | CustomError> => {
    try {
      const category = await this.prismaService.category.findUnique({
        where: {
          id,
        },
      });

      return category;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // Read all Categories
  getCategories = async (): Promise<Category[] | CustomError> => {
    try {
      const categories = await this.prismaService.category.findMany({
        include: {
          products: true,
        },
      });

      return categories;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // Delete Category
  deleteCategory = async (
    id: string,
  ): Promise<CustomResponse | CustomError> => {
    try {
      const category = await this.prismaService.category.delete({
        where: {
          id,
        },
      });

      if (!category) {
        return {
          message: "Category not found",
          statusCode: 404,
        };
      }

      return {
        message: "Category deleted successfully",
        statusCode: 200,
      };
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };
}
