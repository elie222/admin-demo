import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 5_000 })
  text: string;
}
