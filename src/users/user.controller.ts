import { Controller, Get, UseGuards } from '@nestjs/common';
 
import { Roles } from 'src/common/decorator/role.decorator'; 
import { RolesGuard } from 'src/common/guards/roles.guard';  
import { UsersService } from './user.service';
import { Role } from 'src/common/constants/roles.constant';  

@Controller('users')
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findAll();
  }
}
