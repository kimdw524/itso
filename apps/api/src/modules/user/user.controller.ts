import { Controller, Get, Req } from '@nestjs/common';

import { Request } from 'express';

import { UserInfoDto } from './dto';

@Controller('user')
export class UserController {
  @Get()
  getUserInfo(@Req() req: Request): UserInfoDto {
    return {
      email: req.session.user?.email ?? null,
      picture: req.session.user?.picture ?? null,
    };
  }
}
