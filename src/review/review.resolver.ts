import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CustomError } from "src/dto/custom-error.dto";
import { ReviewInput } from "src/dto/input-type/review.dto";
import { Review } from "src/dto/object-type/review.dto";
import { ReviewService } from "./review.service";

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  async postReview(
    @Args("reviewData") reviewData: ReviewInput,
  ): Promise<Review | CustomError> {
    return this.reviewService.postReview(reviewData);
  }
}
