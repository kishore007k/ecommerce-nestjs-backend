import "reflect-metadata";
import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { ProductInput } from "./product.dto";

@InputType()
export class OrderInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => [ProductInput], { nullable: true })
  posts: [ProductInput];
}
