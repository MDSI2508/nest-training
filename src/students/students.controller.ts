import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateUniversityDto } from './dto/create-university.dto';
import { BodyGuard } from './guards/body.guard';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @Post('create-group')
  @UseGuards(new BodyGuard('groupName'))
  createGroup(@Body() body: CreateGroupDto) {
    const { groupName } = body;
    return this.studentsService.createGroup(groupName);
  }

  @Post('create-university')
  @UseGuards(new BodyGuard('universityName'))
  createUniversity(@Body() body: CreateUniversityDto) {
    const { universityName } = body;
    return this.studentsService.createUniversity(universityName);
  }
}
