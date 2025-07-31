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
import { AuthResponseDto } from './dto/auth.dto';

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
  ): Promise<AuthResponseDto> {
    if (!code) {
      throw new UnauthorizedException('Authorization code is required');
    }

    const userInfo = await this.authService.authorizeWithGoogle(code);
    const user = await this.authService.signIn(userInfo);

    req.session.user = user.id;

    return { email: user.email, profile: user.profile };
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
