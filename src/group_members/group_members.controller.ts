import { Controller } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';

@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}
}
