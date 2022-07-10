import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CustomError {
  @Field(() => String)
  message: string;

  @Field(() => Number)
  statusCode: number;

  @Field(() => Object, { nullable: true })
  error?: any;
}
