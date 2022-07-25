import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { BaseModel } from "../base.dto";

@ObjectType()
export class Review extends BaseModel {
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
