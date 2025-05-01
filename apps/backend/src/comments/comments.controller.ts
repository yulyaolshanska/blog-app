import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('/api/posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto, @Param('postId') postId: number) {
    return this.commentsService.create(postId, dto);
  }

  @Get()
  findByPostId(
    @Param('postId') postId: string,
    @Query('limit') limit = 5,
    @Query('page') page = 1,
  ) {
    return this.commentsService.findByPostId(+postId, +limit, +page);
  }
}
