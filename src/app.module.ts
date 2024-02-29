import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
      entities: [join(__dirname , '../src/task/*.entity.{js,ts}')],

    })
  ],     
})
export class AppModule {}
