import { TypeOrmModule } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'task-management',
  autoLoadEntities: true,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.ts'],
  // entities: [join(__dirname , '/**/*.entity.{js,ts}')],
};
