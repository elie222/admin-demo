import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 5_000 })
  text: string;

  @Column('varchar', { length: 100 })
  username: string;

  @Column('string')
  postId: string;

  @ManyToOne(() => Post)
  post: Post;
}
