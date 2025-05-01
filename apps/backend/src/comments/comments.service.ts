import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  create(postId: number, dto: CreateCommentDto) {
    const comment = this.commentRepo.create({
      content: dto.content,
      post: { id: postId },
    });

    return this.commentRepo.save(comment);
  }

  async findByPostId(postId: number, limit: number, offset: number) {
    const [comments, totalCount] = await this.commentRepo.findAndCount({
      where: { post: { id: postId } },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['post'],
    });

    const totalPages = Math.ceil(+totalCount / limit);

    return {
      postId,
      comments,
      totalCount,
      totalPages,
    };
  }
}
