import { Field, ObjectType } from "@nestjs/graphql";
import { UserPass } from "./object-type/user-with-pass.dto";

@ObjectType()
export class LoginResponse {
  @Field(() => UserPass)
  user: UserPass;

  @Field(() => String)
  token: string;
}
