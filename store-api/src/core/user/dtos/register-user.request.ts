import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'testuser@gmail.com',
  })
  public readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'testpwd123',
  })
  public readonly password: string;
}
