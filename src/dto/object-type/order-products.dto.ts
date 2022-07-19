import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { BaseModel } from "../base.dto";

@ObjectType()
export class OrderProducts extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  orderId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  productId?: string;
}
