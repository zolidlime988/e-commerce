import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Request() req: any) {
    const { user } = req;
    return await this.userService.findUserByUsername(user.username);
  }

}
