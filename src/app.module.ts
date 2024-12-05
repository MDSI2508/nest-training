import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students/students.service';
import { StudentsController } from './students/students.controller';
import { Group } from './groups/entities/group.entity';
import { Student } from './students/entities/student.entity';
import { ConfigModule } from '@nestjs/config';
import { University } from './students/entities/university.entity';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { GroupsService } from './groups/groups.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Student, Group, University],
      migrations: [__dirname + '/migrations/*.ts'],
      synchronize: false,
    }),
    StudentsModule,
    AuthModule,
    GroupsModule,
    UsersModule,
  ],
  providers: [StudentsService, GroupsService],
  controllers: [StudentsController],
})
export class AppModule {}
