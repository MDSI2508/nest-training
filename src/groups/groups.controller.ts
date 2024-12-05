import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  createGroup(@Body() body: CreateGroupDto) {
    const { groupName } = body;
    return this.groupsService.createGroup(groupName);
  }

  @Get(':groupName')
  @UseGuards(AuthGuard)
  getGroupWIthStudents(@Param('groupName') groupName: string) {
    return this.groupsService.getGroupsWithStudents(groupName);
  }
}
