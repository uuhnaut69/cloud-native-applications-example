import { BaseApiResponse } from '@app/common/decorators/base-api-response.decorator';
import { AuthService } from '@app/core/auth/auth.service';
import { CurrentUser } from '@app/core/auth/decorators/current-user.decorator';
import { ProfileResponse } from '@app/core/auth/dtos/profile.response';
import { SignInRequest } from '@app/core/auth/dtos/sign-in.request';
import { SignInResponse } from '@app/core/auth/dtos/sign-in.response';
import { AccessTokenGuard } from '@app/core/auth/guards/access-token.guard';
import { RegisterUserRequest } from '@app/core/user/dtos/register-user.request';
import { User } from '@app/core/user/models/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @BaseApiResponse({
    status: HttpStatus.CREATED,
    summary: 'Register new user',
    schemaType: 'string',
    refType: String,
    example: 'ae35418e-41be-4738-a2ec-50fcd8b9569d',
  })
  @Post('/register')
  public async registerNewUser(@Body() request: RegisterUserRequest) {
    return await this.authService.registerNewUser(request);
  }

  @BaseApiResponse({
    summary: 'Sign in',
    schemaType: 'object',
    refType: SignInResponse,
  })
  @Post('/sign-in')
  public async signIn(@Body() request: SignInRequest) {
    return await this.authService.signIn(request);
  }

  @BaseApiResponse({
    summary: 'Get current user profile',
    security: true,
    schemaType: 'object',
    refType: ProfileResponse,
  })
  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  public async getCurrentProfile(@CurrentUser() user: User) {
    return new ProfileResponse(user);
  }
}
