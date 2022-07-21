import "reflect-metadata";
import { Field, HideField, InputType } from "@nestjs/graphql";
import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";
import { Role } from "../enum/role";

@InputType()
export class UserInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: false })
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @HideField()
  password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  salt?: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  role: Role;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @HideField()
  deletedAt?: Date;
}
