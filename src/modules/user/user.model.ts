import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Post } from "../post/post.model";

@ObjectType()
export class User {

    @Field(() =>Int,{nullable:true})
    id:number

    @Field()
    username:string


    @Field(() => Int)
    age:number



    @Field(() => [Post], { nullable: true }) 
    posts?: Post[];
}