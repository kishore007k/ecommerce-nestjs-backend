import "reflect-metadata";
import { Field, Float, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class OrderInput {
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
}
