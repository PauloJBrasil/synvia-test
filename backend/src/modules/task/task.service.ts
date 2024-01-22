import { Injectable } from '@nestjs/common';
import { Task } from './entities/task';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { QueryParamsTaskDto } from './dto/query-params-task.dto';
import { query } from 'express';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll({
    take,
    page,
    orderBy = 'createdAt',
    direction = 'DESC',
    ...query
  }: QueryParamsTaskDto) {
    const builder = this.taskRepository
      .createQueryBuilder('task')
      .select([
        'task.id',
        'task.titulo',
        'task.descricao',
        'task.tags',
        'task.createdAt',
        'responsavelTask.id',
        'responsavelTask.nome',
        'responsavelTask.email',
      ])
      .leftJoin('task.responsavelTask', 'responsavelTask');

    if (take && page) {
      const skip = (page - 1) * take;
      builder.skip(skip);
      builder.take(take);
    }

    if (query.titulo) {
      builder.andWhere('task.titulo ILIKE :titulo', {
        titulo: `%${query.titulo}%`,
      });
    }

    if (query.data) {
      builder.andWhere('task.data = :data', {
        data: query.data,
      });
    }

    if (query.descricao) {
      builder.andWhere('task.descricao ILIKE :descricao', {
        descricao: `%${query.descricao}%`,
      });
    }

    if (query.responsavel) {
      builder.andWhere('responsavelTask.nome ILIKE :responsavel', {
        responsavel: `%${query.responsavel}%`,
      });
    }

    if (query.tags) {
      builder.andWhere('task.tags ILIKE :tags', {
        tags: `%${query.tags}%`,
      });
    }

    builder.orderBy(`task.${orderBy}`, direction);

    const tasks = await builder.getMany();
    return tasks.map((task) => ({
      ...task,
      tags: task.tags?.split(', '),
    }));
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        tags: true,
        responsavelTask: {
          id: true,
          nome: true,
          email: true,
        },
      },
      relations: ['responsavelTask'],
    });

    return { ...task, tags: task.tags.split(', ') };
  }

  async createTask(body: CreateTaskDTO) {
    return this.taskRepository.save({
      titulo: body.titulo,
      descricao: body.descricao,
      tags: body.tags?.map((tag) => tag.trim()).join(', '),
      responsavel: body.responsavel,
    });
  }

  async updateTask(id: string, body: CreateTaskDTO) {
    return this.taskRepository.update(id, {
      titulo: body.titulo,
      descricao: body.descricao,
      tags: body.tags?.map((tag) => tag.trim()).join(', '),
      responsavel: body.responsavel,
    });
  }

  async deleteTask(id: string) {
    return this.taskRepository.delete(id);
  }

  async updateTaskTags(id: string, body: any) {
    return this.taskRepository.update(id, {
      tags: body.tags
        .split(',')
        .map((tag) => tag.trim())
        .join(', '),
    });
  }

  async updateTaskResponsavel(id: string, body: any) {
    return this.taskRepository.update(id, {
      responsavel: body.responsavel,
    });
  }
}
