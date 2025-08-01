import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthSessionGuard } from '../auth-session-guard/auth-session-gaurd';
import { UserInfoDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthSessionGuard)
  async getUserInfo(@Req() req: Request): Promise<UserInfoDto> {
    const userId = req.session.user;

    if (userId === undefined) {
      throw new NotFoundException('user not found');
    }

    const user = await this.userService.find({ id: userId });

    if (user === null) {
      throw new NotFoundException('user not found');
    }

    return {
      email: user.email,
      profile: user.profile,
    };
  }
}
