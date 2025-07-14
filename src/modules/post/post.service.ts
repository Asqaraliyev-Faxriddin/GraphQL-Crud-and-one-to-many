import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './update-post.dto'; 

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}


  async create(payload: CreatePostDto) {

    return await this.prisma.post.create({
      data: payload,
    });
  }


  async findAll() {
    return await this.prisma.post.findMany({
      include: {
        user: true, 
      },
    });
  }


  async findOne(id: number) {
    let oldUser = await this.prisma.post.findFirst({where:{id}})
    if(!oldUser) throw new NotFoundException("user not found")

    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!post) throw new NotFoundException('Post topilmadi');
    return post;
  }


  async update(id: number, payload: UpdatePostDto) {
    let oldUser = await this.prisma.post.findFirst({where:{id}})
    if(!oldUser) throw new NotFoundException("user not found")
    let data = await this.prisma.post.update({
      where: { id },
      data: payload,
    });

    return data
  }

  async remove(id: number) {
    
    let data = await this.prisma.post.delete({
      where: { id },
    });

    return data
  }


}
