import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';

  @InputType()
  export class UploadFileInput {
    @Field(() => GraphQLUpload)
    file: Promise<FileUpload>;
  }


@InputType()
export class CreateUserDto{

    @Field()
    username:string
    

    @Field()
    email:string
    

    @Field()
    password:string

    @Field(()=> Int)
    age:number

}




@InputType()
export class UpdateDto extends PartialType(CreateUserDto){}


