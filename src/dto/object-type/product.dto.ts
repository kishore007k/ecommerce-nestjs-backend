import "reflect-metadata";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "../base.dto";
import { IsOptional, IsString } from "class-validator";
import { OrderProducts } from "./order-products.dto";

@ObjectType()
export class Product extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => [OrderProducts], { nullable: true })
  orderProducts?: OrderProducts | null;
}
