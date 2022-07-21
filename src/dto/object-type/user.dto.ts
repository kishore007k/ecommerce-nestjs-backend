import "reflect-metadata";
import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";
import { Order } from "./order.dto";
import { BaseModel } from "../base.dto";
import { Role } from "../enum/role";
import { Image } from "./image.dto";
import { Review } from "./review.dto";
import { Wishlist } from "./wishlist.dto";

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
  avatar?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  salt?: string;

  @Field(() => Role, { nullable: true })
  @IsOptional()
  role: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  @HideField()
  deletedAt?: Date;

  @Field(() => [Order], { nullable: true })
  orders?: Order[] | null;

  @Field(() => [Review], { nullable: true })
  review?: Review[] | [];

  @Field(() => [Wishlist], { nullable: true })
  wishlist?: Wishlist[] | null;
}
