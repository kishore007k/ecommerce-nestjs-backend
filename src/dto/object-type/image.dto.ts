import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { BaseModel } from "../base.dto";

@ObjectType()
export class Image extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  alt?: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsOptional()
  url?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  userId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  productId?: string;
}
