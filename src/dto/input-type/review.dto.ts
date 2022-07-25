import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class ReviewInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  review?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  stars?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  userId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  productId?: string;
}
