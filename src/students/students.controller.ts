import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateUniversityDto } from './dto/create-university.dto';
import { BodyGuard } from '../guards/body.guard';
import { TagInterceptor } from '../interceptors/tag.interceptor';
import { AuthGuard } from '../guards/auth.guard';

@Controller('students')
@UseInterceptors(TagInterceptor)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }

  @Post('create-university')
  @UseGuards(new BodyGuard('universityName'))
  createUniversity(@Body() body: CreateUniversityDto) {
    const { universityName } = body;
    return this.studentsService.createUniversity(universityName);
  }
}
