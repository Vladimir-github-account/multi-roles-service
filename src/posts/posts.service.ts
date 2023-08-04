import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async createPost(dto: CreatePostDto, imageSrc: any) {
    const fileName = 'test';
    const post = await this.postRepository.create({
      ...dto,
      imageSrc: fileName,
    });
    return post;
  }
}
