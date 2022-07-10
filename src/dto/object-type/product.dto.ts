import "reflect-metadata";
import { Field, ObjectType } from "@nestjs/graphql";
import { BaseModel } from "../base.dto";
import { IsOptional, IsString } from "class-validator";
import { Order } from "./order.dto";

@ObjectType()
export class Product extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => Order, { nullable: true })
  order?: Order | null;
}
