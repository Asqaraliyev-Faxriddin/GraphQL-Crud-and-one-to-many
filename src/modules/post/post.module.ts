import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
    providers:[PostService,PostResolver]
})
export class PostModule {}
