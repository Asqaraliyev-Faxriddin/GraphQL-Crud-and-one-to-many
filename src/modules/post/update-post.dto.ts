import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePostDto } from './dto/create-post.dto'; 

@InputType()
export class UpdatePostDto extends PartialType(CreatePostDto) {}
