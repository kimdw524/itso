import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleAuthCallbackDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}

export class GoogleAuthResponseDto {
  email: string;
  picture: string;
}
