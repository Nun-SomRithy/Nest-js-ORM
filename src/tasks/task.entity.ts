import { Entity, PrimaryGeneratedColumn,Column } from 'typeorm';
import { TaskStatus } from './tasks.status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: any;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
