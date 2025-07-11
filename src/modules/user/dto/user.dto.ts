import { Field, InputType, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto{

    @Field()
    username:string
    

    @Field()
    lastname:string

    @Field()
    phone:string

    @Field(()=> Int)
    age:number
}




@InputType()
export class UpdateDto extends PartialType(CreateUserDto){}