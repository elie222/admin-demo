import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const post = new Post();

    post.text = createPostDto.text;

    const p = await this.repository.save(post);

    return p;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.repository.update(id, { text: updatePostDto.text });
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
