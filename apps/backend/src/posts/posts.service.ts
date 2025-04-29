import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';
import { CreatePostDto,UpdatePostDto } from './dto/dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepo: Repository<Post>,
  ) {}

  findAll() {
    return this.postsRepo.find({ relations: ['comments'] });
  }

  findOne(id: number) {
    return this.postsRepo.findOne({ where: { id }, relations: ['comments'] });
  }

  create(dto: CreatePostDto) {
    return this.postsRepo.save(dto);
  }

  async update(id: number, dto: UpdatePostDto) {
      const post = await this.postsRepo.findOneBy({ id });
      
      if (!post) {
          throw new NotFoundException('Post not found');
      }
      
    return this.postsRepo.save({ ...post, ...dto });
  }

  async remove(id: number) {
      const post = await this.postsRepo.findOneBy({ id });
      
      if (!post) {
          throw new NotFoundException('Post not found');
      }

    return this.postsRepo.remove(post);
  }
}
