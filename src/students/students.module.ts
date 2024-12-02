import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Group } from './entities/group.entity';
import { University } from './entities/university.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Group, University])],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [TypeOrmModule],
})
export class StudentsModule {}
