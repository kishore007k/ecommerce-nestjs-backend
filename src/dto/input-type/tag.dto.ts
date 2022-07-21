import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class TagInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  tag?: string;
}
