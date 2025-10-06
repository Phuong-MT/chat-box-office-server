import { Controller } from '@nestjs/common';
import { GroupMembersService } from './group_members.service';

@Controller('/api/group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}
}
