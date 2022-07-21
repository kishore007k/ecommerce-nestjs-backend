import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class ImageInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  alt?: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsOptional()
  url?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  userId?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  productId?: string;
}
