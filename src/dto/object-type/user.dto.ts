import "reflect-metadata";
import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";
import { Order } from "./order.dto";
import { BaseModel } from "../base.dto";

@ObjectType()
export class User extends BaseModel {
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

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  avatar?: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @HideField()
  deletedAt?: Date;

  @Field(() => [Order], { nullable: true })
  orders?: Order[] | null;
}
