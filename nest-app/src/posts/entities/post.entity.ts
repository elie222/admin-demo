import { Comment } from 'src/comments/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 5_000 })
  text: string;

  @Column('varchar', { length: 100 })
  username: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments?: Comment[];
}
