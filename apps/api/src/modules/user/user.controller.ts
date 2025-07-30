import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { AuthSessionGuard } from '../auth-session-guard/auth-session-gaurd';
import { UserInfoDto } from './dto';

@Controller('user')
export class UserController {
  @Get()
  @UseGuards(AuthSessionGuard)
  getUserInfo(@Req() req: Request): UserInfoDto {
    return { email: req.session.user! };
  }
}
