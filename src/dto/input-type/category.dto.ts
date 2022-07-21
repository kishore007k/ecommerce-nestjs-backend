import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class CategoryInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  category?: string;
}
