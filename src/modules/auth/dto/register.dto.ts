import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class RegisterDto{


    @Field()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    @Field()
    password:string

    @IsNotEmpty()
    @Field()
    @IsString()
    username:string

    @Field()
    @IsNotEmpty()
    age:number
}



@InputType()
export class LoginDto{



    @IsNotEmpty()
    @IsString()
    @Field()
    password:string

    @IsNotEmpty()
    @Field()
    @IsString()
    username:string

}

