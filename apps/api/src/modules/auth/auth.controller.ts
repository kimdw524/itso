import {
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { Request } from 'express';

import { AuthService, GoogleUserInfo } from './auth.service';

export interface GoogleAuthResponse {
  user: GoogleUserInfo;
  accessToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  async googleAuth(
    @Query('code') code: string,
    @Req() req: Request,
  ): Promise<boolean> {
    if (!code) {
      throw new UnauthorizedException('Authorization code is required');
    }

    try {
      const result = await this.authService.authorizeWithGoogle(code);
      req.session.user = result;
      return true;
    } catch (_) {
      throw new UnauthorizedException('Google authentication failed');
    }
  }

  @Delete()
  async signOut(@Req() req: Request): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(new InternalServerErrorException());
        } else {
          resolve();
        }
      });
    });
  }
}
