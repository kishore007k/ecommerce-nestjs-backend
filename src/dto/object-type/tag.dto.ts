import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { BaseModel } from "../base.dto";
import { Product } from "./product.dto";

@ObjectType()
export class Tag extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tag?: string;

  @Field(() => [Product], { nullable: true })
  products?: Product[] | null;
}
