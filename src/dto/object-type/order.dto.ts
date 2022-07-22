import "reflect-metadata";
import { Field, Float, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { BaseModel } from "../base.dto";
import { User } from "./user.dto";
import { OrderProducts } from "./order-products.dto";

@ObjectType()
export class Order extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  price?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => [OrderProducts], { nullable: true })
  orderProducts?: OrderProducts[] | null;
}
