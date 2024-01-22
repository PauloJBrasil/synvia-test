import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task';
import { Usuario } from '../usuario/entities/usuario';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Usuario])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
