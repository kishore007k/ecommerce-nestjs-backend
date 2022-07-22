import "reflect-metadata";
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "../base.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { OrderProducts } from "./order-products.dto";
import { Image } from "./image.dto";
import { Review } from "./review.dto";

@ObjectType()
export class Product extends BaseModel {
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

  @Field(() => [String], { nullable: true })
  @IsOptional()
  image?: string[];

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

  @Field(() => [OrderProducts], { nullable: true })
  orderProducts?: OrderProducts[] | null;

  @Field(() => [Review], { nullable: true })
  reviews?: Review[] | null;
}
