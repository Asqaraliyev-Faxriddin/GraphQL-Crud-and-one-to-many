import { ConflictException, HttpException, HttpStatus, HttpVersionNotSupportedException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto, UpdateDto } from './dto/user.dto';
import { GraphQLError } from 'graphql';

@Injectable()
export class UserService {

    constructor(private prisma:PrismaService){}
  
async getUser(username: string) {
    let oldUser = await this.prisma.user.findFirst({where:{username}})
    if(!oldUser) throw new NotFoundException("user not found")
    let data = await this.prisma.user.findFirst({
      where: { username },
      include: {
        posts: true, 
      },
    });
    return data;
  }
  

  async AllUsers() {
    let data = await this.prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    return data;
  }
  

    async createUser(payload:CreateUserDto){
        let oldUser = await this.prisma.user.findFirst({where:{username:payload.username}})

        if(oldUser) {
            throw new ConflictException('this is user already exist')
            
        }
        let data = await this.prisma.user.create({data:payload})

        return data

    }

    async updateUser(id:number,payload:UpdateDto){
        let oldUser = await this.prisma.user.findFirst({where:{id}})
        if(!oldUser){
            throw new NotFoundException("user not found")
        }
        let data = await this.prisma.user.update({where:{id:id},data:payload})

        return data
    }

    async deleteUser(id:number){
        let data = await this.prisma.user.delete({where:{id}})
        if(!data) throw new NotFoundException()

        return data
    }


}
