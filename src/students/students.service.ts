import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { University } from './entities/university.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,

    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { firstName, lastName, age, groupId, universityId } =
      createStudentDto;

    const group = await this.groupRepository.findOneBy({ id: groupId });
    if (!group) {
      throw new Error('Group not found');
    }

    const university = await this.universityRepository.findOneBy({
      id: universityId,
    });

    const student = this.studentRepository.create({
      firstName,
      lastName,
      age,
      group,
      university,
    });

    return this.studentRepository.save(student);
  }

  async createGroup(groupName: string) {
    const group = this.groupRepository.create({ groupName });

    return this.groupRepository.save(group);
  }

  async createUniversity(name: string) {
    const university = this.universityRepository.create({ name });

    return this.universityRepository.save(university);
  }

  async findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new Error('Student not found');
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);
    if (!student) {
      throw new Error('Student not found');
    }

    await this.studentRepository.update(id, updateStudentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    if (!student) {
      throw new Error('Student not found');
    }

    await this.studentRepository.delete(id);
    return `Student with ID ${id} has been removed`;
  }
}
