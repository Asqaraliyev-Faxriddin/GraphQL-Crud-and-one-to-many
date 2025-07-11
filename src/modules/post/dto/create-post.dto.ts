import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePostDto {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => Int)
  user_id: number;
}
    