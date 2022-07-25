import { Injectable } from "@nestjs/common";
import { CustomError } from "src/dto/custom-error.dto";
import { Review } from "src/dto/object-type/review.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { ReviewInput } from "../dto/input-type/review.dto";

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  postReview = async (
    reviewData: ReviewInput,
  ): Promise<Review | CustomError> => {
    try {
      const createdReview = await this.prismaService.review.create({
        data: {
          ...reviewData,
        },
      });

      // Update product rating
      const product = await this.prismaService.product.findUnique({
        where: { id: reviewData.productId },
      });
      const productRating = product.stars + reviewData.stars;
      await this.prismaService.product.update({
        where: { id: reviewData.productId },
        data: { stars: productRating },
      });

      // Update user rating

      return createdReview;
    } catch (error) {
      return {
        message: error.message,
        statusCode: 400,
      };
    }
  };
}
