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

  create(dto: CreateCommentDto) {
    const comment = this.commentRepo.create({
      content: dto.content,
      post: { id: dto.postId },
    });

    return this.commentRepo.save(comment);
  }
}
