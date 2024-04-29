import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    database: "tasks",
    synchronize: true,
    entities: [Task],
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }), AuthModule, UsersModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
