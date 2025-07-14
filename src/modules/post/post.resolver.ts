import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './update-post.dto'; 

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(@Args('payload') payload: CreatePostDto) {
    return this.postService.create(payload);
  }

  @Query(() => [Post])
  findAllPosts() {
    return this.postService.findAll();
  }


  @Query(() => Post)
  findPost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }


  @Mutation(() => Post)
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('payload') payload: UpdatePostDto,
  ) {
    return this.postService.update(id, payload);
  }


  @Mutation(() => Post)
  deletePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }


}
