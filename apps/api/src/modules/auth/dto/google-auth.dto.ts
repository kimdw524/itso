import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleAuthCallbackDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class GoogleAuthResponseDto {
  user: {
    id: string;
    email: string;
    name: string;
    picture: string;
  };
  accessToken: string;
}

export class GoogleLoginUrlResponseDto {
  loginUrl: string;
}
