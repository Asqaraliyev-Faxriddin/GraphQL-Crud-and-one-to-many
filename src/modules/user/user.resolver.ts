import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { User } from "./user.model";
import { CreateUserDto, UpdateDto } from "./dto/user.dto";

@Resolver(()=>User)
export class UserResolver {
    constructor(private readonly UserService:UserService){}
    
    @Query(() => [User], { nullable: true })
    getUser(@Args("name") name: string) {
      return this.UserService.getUser(name);
    }
    
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

}