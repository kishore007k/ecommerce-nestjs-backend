import "reflect-metadata";
import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class ProductInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  price?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  stars?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  wishlistId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tagId?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  image?: string[];
}
