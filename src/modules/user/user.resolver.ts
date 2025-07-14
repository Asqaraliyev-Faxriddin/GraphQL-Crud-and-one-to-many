import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { CreateUserDto, UpdateDto } from "./dto/user.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/common/types/user";
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';
import { createWriteStream } from "fs";
import { join} from "path"

@Resolver(()=>User)
export class UserResolver {
    constructor(private readonly UserService:UserService){}
    
    @Query(() => [User], { nullable: true })
    getUser(@Args("name") name: string) {
      return this.UserService.getUser(name);
    }
    
    @UseGuards(AuthGuard,RolesGuard)
    @Roles(UserRole.ADMIN,UserRole.SUPERADMIN)
    @Query(() => [User])
    async AllUsers() {
      return await this.UserService.AllUsers();
    }


    
    @Mutation(() => User, { nullable: true })
  async deleteUser(@Args('id', { type: () => Int }) id: number) {
    return await this.UserService.deleteUser(id);
  }

    @Mutation(() => User, { nullable: true })
    async updateUser(
        @Args('id', { type: () => Int }) id: number,
        @Args('data') data: UpdateDto,
    ) {
        return await this.UserService.updateUser(id, data);
    }
    



  @Mutation(() => User, { nullable: true })
  async createUser(
    @Args('data') data: CreateUserDto,
  ) {
    return await this.UserService.createUser(data);
  }


  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async uploadFile(@Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload){
    const { createReadStream, filename } = file;
    const filename2 = Date.now() + "-" + filename;
    const path = join('./uploads', filename2);
  
    try {
      await new Promise<void>((resolve, reject) => {
        createReadStream()
          .pipe(createWriteStream(path))
          .on('finish', () => resolve())
          .on('error', (err) => reject(err));
      });
  
      return this.UserService.fileUpload(filename2);
    } catch (err) {
      console.error('Upload error:', err);
      return "Xatolik yuz berdi!";
    }
  }
  
}