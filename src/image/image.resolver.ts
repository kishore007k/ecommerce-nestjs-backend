import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { join } from "path";
import { CustomError } from "src/dto/custom-error.dto";
import { CustomResponse } from "src/dto/custom-response.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ImageService } from "./image.service";
import * as fs from "fs";

@Resolver()
export class ImageResolver {
  constructor(
    private readonly imageService: ImageService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => CustomResponse)
  async uploadProductImage(
    @Args("productId") productId: string,
    @Args({ name: "file", type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<CustomResponse | CustomError> {
    const rootDir = join(process.cwd(), "uploads");

    // Check and create directory if not exists (uploads)
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir);
    }

    // Get user by id
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    // If user not found return error
    if (!product) {
      return {
        message: "Product not found",
        statusCode: 404,
      };
    }

    // Create write stream
    const isUploaded = await this.imageService.uploadProductImage(
      productId,
      product.name,
      createReadStream,
    );

    // If file not uploaded return error
    if (isUploaded instanceof CustomError) {
      return {
        message: "Upload failed",
        statusCode: 500,
      };
    }

    // Update Image id to product
    await this.prismaService.product.update({
      where: { id: productId },
      data: {
        image: [...product.image, isUploaded.url],
      },
    });

    return {
      message: "Product image uploaded successfully!",
      statusCode: 200,
    };
  }
}
