import "reflect-metadata";
import { Field, HideField, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsString } from "class-validator";
import { OrderInput } from "./order.dto";
import { Role } from "../enum/role";

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true })
  @IsString()
  id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @HideField()
  password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  salt?: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  role?: Role;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @Field(() => [OrderInput], { nullable: true })
  posts: [OrderInput];
}
