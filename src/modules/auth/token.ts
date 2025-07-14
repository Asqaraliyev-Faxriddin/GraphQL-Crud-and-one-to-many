import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthResponse {
  @Field()
  accesToken: string;

  @Field()
  refreshToken: string;
}
