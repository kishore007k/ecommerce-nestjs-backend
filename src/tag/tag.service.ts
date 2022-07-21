import { Injectable } from "@nestjs/common";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { TagInput } from "src/dto/input-type/tag.dto";
import { Tag } from "src/dto/object-type/tag.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TagService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create Tag
  createTag = async (data: TagInput): Promise<Tag | CustomError> => {
    try {
      const tag = await this.prismaService.tag.create({
        data,
      });

      return tag;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // Read Tag
  getTag = async (id: string): Promise<Tag | CustomError> => {
    try {
      const tag = await this.prismaService.tag.findUnique({
        where: {
          id,
        },
      });

      return tag;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // Read all Tags
  getTags = async (): Promise<Tag[] | CustomError> => {
    try {
      const tags = await this.prismaService.tag.findMany({
        include: { products: true },
      });

      return tags;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 500,
      };
    }
  };

  // Delete Tag
  deleteTag = async (id: string): Promise<CustomResponse | CustomError> => {
    try {
      const tag = await this.prismaService.tag.delete({
        where: {
          id,
        },
      });

      if (!tag) {
        return {
          message: "Tag not found",
          statusCode: 404,
        };
      }

      return {
        message: "Tag deleted successfully",
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
