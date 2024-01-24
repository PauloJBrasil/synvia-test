import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task';
import { Usuario } from '../usuario/entities/usuario';
import { TaskTag } from '../tag/entities/task-tag';
import { Tag } from '../tag/entities/tag';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Usuario, TaskTag, Tag])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
