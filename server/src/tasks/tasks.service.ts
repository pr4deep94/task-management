import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) { }

  async create(post: Task): Promise<Task> {
    return this.taskRepository.save(post);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id): Promise<Task> {
    return this.taskRepository.findOneById(id);
  }

  async update(id, updateTaskDto: UpdateTaskDto): Promise<Task> {
    let task = await this.taskRepository.findOneById(id);
      for (const key in updateTaskDto) {
        task[key] = updateTaskDto[key];
      }
    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    return  await this.taskRepository.delete(id)
  }
}
