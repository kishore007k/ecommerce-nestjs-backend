import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./object-type/user.dto";

@ObjectType()
export class CustomResponse {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  statusCode: number;

  // @Field({ nullable: true })
  // data?: any;
}
