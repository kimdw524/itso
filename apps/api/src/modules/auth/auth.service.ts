import { Injectable, UnauthorizedException } from '@nestjs/common';

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface GoogleTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  id_token: string;
  scope: string;
}

interface GoogleUserInfoResponse {
  sub: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

@Injectable()
export class AuthService {
  private readonly GOOGLE_CLIENT_ID: string;
  private readonly GOOGLE_CLIENT_SECRET: string;
  private readonly GOOGLE_REDIRECT_URI: string;

  constructor() {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
      throw new Error(
        'Google OAuth configuration is missing. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REDIRECT_URI environment variables.',
      );
    }

    this.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
    this.GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;
    this.GOOGLE_REDIRECT_URI = GOOGLE_REDIRECT_URI;
  }

  private async getGoogleUserInfo(
    accessToken: string,
  ): Promise<GoogleUserInfoResponse> {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok === false) {
      throw new UnauthorizedException('userinfo fetch failed');
    }

    return (await res.json()) as GoogleUserInfoResponse;
  }

  private async getGoogleAccessToken(code: string): Promise<string> {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: this.GOOGLE_CLIENT_ID,
        client_secret: this.GOOGLE_CLIENT_SECRET,
        redirect_uri: this.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    if (res.ok === false) {
      throw new UnauthorizedException('invalid token');
    }

    const data = (await res.json()) as GoogleTokenResponse;

    return data.access_token;
  }

  async authorizeWithGoogle(code: string) {
    const accessToken = await this.getGoogleAccessToken(code);
    const userInfo = await this.getGoogleUserInfo(accessToken);

    return userInfo.email;
  }
}
