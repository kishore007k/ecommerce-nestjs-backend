import "reflect-metadata";
import { Field, ObjectType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { BaseModel } from "../base.dto";
import { User } from "./user.dto";
import { Product } from "./product.dto";

@ObjectType()
export class Order extends BaseModel {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => [Product], { nullable: true })
  products?: Product[] | null;
}
