import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { QueryParamsTaskDto } from './dto/query-params-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(@Query() query: QueryParamsTaskDto) {
    return this.taskService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  async createTask(@Body() body: CreateTaskDTO) {
    return this.taskService.createTask(body);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: CreateTaskDTO) {
    return this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }

  @Patch('/tags/:id')
  async updateTaskTags(@Param('id') id: string, @Body() body: any) {
    return this.taskService.updateTaskTags(id, body);
  }

  @Patch('/responsavel/:id')
  async updateTaskResponsavel(@Param('id') id: string, @Body() body: any) {
    return this.taskService.updateTaskResponsavel(id, body);
  }
}
