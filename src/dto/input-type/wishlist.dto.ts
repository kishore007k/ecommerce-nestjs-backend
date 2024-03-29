import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class WishlistInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  userId?: string;
}
