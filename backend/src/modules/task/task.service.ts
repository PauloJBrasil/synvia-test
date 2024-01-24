import { Inject, Injectable } from '@nestjs/common';
import { Task } from './entities/task';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { QueryParamsTaskDto } from './dto/query-params-task.dto';
import { TaskTag } from '../tag/entities/task-tag';
import { Tag } from '../tag/entities/tag';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(TaskTag)
    private taskTagRepository: Repository<TaskTag>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
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
        'task.createdAt',
        'taskTag',
        'tagTask',
        'responsavelTask.id',
        'responsavelTask.nome',
        'responsavelTask.email',
      ])
      .leftJoin('task.responsavelTask', 'responsavelTask')
      .leftJoin('task.taskTag', 'taskTag')
      .leftJoin('taskTag.tagTask', 'tagTask');

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
      builder.andWhere(
        `CAST(task.createdAt AS DATE) = to_date(:data, 'YYYY-MM-DD')`,
        {
          data: query.data,
        },
      );
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
      builder.andWhere('taskTag.tagTask.nomeTag ILIKE :tags', {
        tags: `%${query.tags}%`,
      });
    }

    builder.orderBy(`task.${orderBy}`, direction);

    const [data, count] = await builder.getManyAndCount();
    return {
      data,
      count,
      total_pages: Math.ceil(count / take),
    };
  }

  async findOne(id: string) {
    return this.taskRepository
      .createQueryBuilder('task')
      .select([
        'task.id',
        'task.titulo',
        'task.descricao',
        'task.createdAt',
        'taskTag',
        'tagTask',
        'responsavelTask.id',
        'responsavelTask.nome',
        'responsavelTask.email',
      ])
      .leftJoin('task.responsavelTask', 'responsavelTask')
      .leftJoin('task.taskTag', 'taskTag')
      .leftJoin('taskTag.tagTask', 'tagTask')
      .where('task.id = :id', { id })
      .getOne();
  }

  async createTask(body: CreateTaskDTO) {
    const task = await this.taskRepository.save({
      titulo: body.titulo,
      descricao: body.descricao,
      responsavel: body.responsavel,
    });

    const taskTags = await Promise.all(
      body.tags.map(async (tag) => {
        if (tag.id)
          return this.taskTagRepository.save({
            tag: tag.id,
            task: task.id,
            usuario: body.responsavel,
          });

        if (!tag.id && tag.nameTag) {
          const tagCriada = await this.tagRepository.save({
            nomeTag: tag.nameTag,
          });

          return this.taskTagRepository.save({
            tag: tagCriada.id,
            task: task.id,
            usuario: body.responsavel,
          });
        }
      }),
    );

    return { ...task, taskTags };
  }

  async updateTask(id: string, body: CreateTaskDTO) {
    const taskTags = await this.taskTagRepository.find({
      where: {
        task: id,
      },
      relations: ['tagTask'],
    });

    const taskTagsRemove = taskTags.filter(
      (taskTag) =>
        !body.tags.some(
          (tag) =>
            tag.nameTag === taskTag.tagTask.nomeTag || tag.id === taskTag.tag,
        ),
    );

    Promise.all(
      taskTagsRemove.map(async (taskTag) => {
        await this.taskTagRepository.delete(taskTag.id);
      }),
    );

    Promise.all(
      body.tags.map(async (tag) => {
        if (tag.id)
          return this.taskTagRepository.save({
            tag: tag.id,
            task: id,
            usuario: body.responsavel,
          });

        if (!tag.id && tag.nameTag) {
          const tagCriada = await this.tagRepository.save({
            nomeTag: tag.nameTag,
          });

          return this.taskTagRepository.save({
            tag: tagCriada.id,
            task: id,
            usuario: body.responsavel,
          });
        }
      }),
    );

    return this.taskRepository.update(id, {
      titulo: body.titulo,
      descricao: body.descricao,
      responsavel: body.responsavel,
    });
  }

  async deleteTask(id: string) {
    await this.taskTagRepository.delete({
      task: id,
    });
    return this.taskRepository.delete(id);
  }

  async updateTaskTags(id: string, body: any) {
    // return this.taskRepository.update(id, {
    //   tags: body.tags
    //     .split(',')
    //     .map((tag) => tag.trim())
    //     .join(', '),
    // });
  }

  async updateTaskResponsavel(id: string, body: any) {
    return this.taskRepository.update(id, {
      responsavel: body.responsavel,
    });
  }
}
