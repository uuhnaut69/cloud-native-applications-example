import { ApiProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  public readonly accessToken: string;

  @ApiProperty({
    example: 3600,
  })
  public readonly accessTokenExpiresIn: number;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  public readonly refreshToken: string;

  @ApiProperty({
    example: 86400,
  })
  public readonly refreshTokenExpiresIn: number;

  constructor(
    accessToken: string,
    accessTokenExpiresIn: number,
    refreshToken: string,
    refreshTokenExpiresIn: number,
  ) {
    this.accessToken = accessToken;
    this.accessTokenExpiresIn = accessTokenExpiresIn;
    this.refreshToken = refreshToken;
    this.refreshTokenExpiresIn = refreshTokenExpiresIn;
  }
}
