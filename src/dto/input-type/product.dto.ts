import "reflect-metadata";
import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class ProductInput {
  @Field(() => String, { nullable: true })
  @IsString()
  id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
