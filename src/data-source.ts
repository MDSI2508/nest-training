import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { University } from './students/entities/university.entity';
import { Group } from './students/entities/group.entity';
import { Student } from './students/entities/student.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Student, Group, University],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
});
