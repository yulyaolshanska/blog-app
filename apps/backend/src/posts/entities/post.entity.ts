import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @OneToMany(() => Comment, comment => comment.post, { cascade: true })
  comments: Comment[];
}
