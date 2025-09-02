import { Body, Controller, Post, Req } from '@nestjs/common';

import { Request } from 'express';

import { getIP } from '@/utils/common';

import { CreateLogDto } from './dto';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  async createLog(@Req() req: Request, @Body() body: CreateLogDto) {
    const userId = req.session.user,
      ip = getIP(req.ips);

    await this.logService.createLog(body.type, body.target, userId, ip);
  }
}
