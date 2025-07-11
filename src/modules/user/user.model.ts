import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "../post/post.model";

@ObjectType()
export class User {

    @Field(() =>Int)
    id:number

    @Field()
    username:string

    @Field()
    lastname:string

    @Field(() => Int)
    age:number

    @Field()
    phone:string

    @Field(() => [Post], { nullable: true }) 
    posts?: Post[];
}