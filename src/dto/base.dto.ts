import { Field, ObjectType } from "@nestjs/graphql";
import { IsDateString, IsString } from "class-validator";

@ObjectType()
export class BaseModel {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => Date)
  @IsDateString()
  createdAt: Date;

  @Field(() => Date)
  @IsDateString()
  updatedAt: Date;
}
