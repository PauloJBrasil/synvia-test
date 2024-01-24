import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from './entities/tag';
import { Usuario } from '../usuario/entities/usuario';
import { Task } from '../task/entities/task';
import { TaskTag } from './entities/task-tag';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Usuario, Tag, TaskTag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
