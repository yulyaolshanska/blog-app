import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import ormConfig from '../ormconfig';

@Module({
imports: [
    TypeOrmModule.forRoot(ormConfig),
    PostsModule,
    CommentsModule,
  ],
})
  
export class AppModule {}
