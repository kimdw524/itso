import { Controller, Get, Req } from '@nestjs/common';

import { Request } from 'express';

import { AppService } from './app.service';
import { getIP } from './utils/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDate(@Req() req: Request): unknown[] {
    return [req.ips, getIP(req.ips), new Date().toLocaleString()];
  }
}
