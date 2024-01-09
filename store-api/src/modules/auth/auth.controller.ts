import { BaseResponse } from '@app/common/http/models/base.response';
import { AuthService } from '@app/modules/auth/auth.service';
import { CurrentUser } from '@app/modules/auth/decorators/current-user.decorator';
import { ProfileResponse } from '@app/modules/auth/dtos/profile.response';
import { SignInRequest } from '@app/modules/auth/dtos/sign-in.request';
import { SignInResponse } from '@app/modules/auth/dtos/sign-in.response';
import { AccessTokenGuard } from '@app/modules/auth/guards/access-token.guard';
import { RegisterUserRequest } from '@app/modules/user/dtos/register-user.request';
import { User } from '@app/modules/user/models/user.entity';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller({
  path: '/auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async registerNewUser(
    @Body() request: RegisterUserRequest,
  ): Promise<BaseResponse<string>> {
    const data = await this.authService.registerNewUser(request);
    return BaseResponse.success(data);
  }

  @Post('/sign-in')
  public async signIn(
    @Body() request: SignInRequest,
  ): Promise<BaseResponse<SignInResponse>> {
    const {
      accessToken,
      accessTokenExpiresIn,
      refreshToken,
      refreshTokenExpiresIn,
    } = await this.authService.signIn(request);
    return BaseResponse.success(
      new SignInResponse(
        accessToken,
        accessTokenExpiresIn,
        refreshToken,
        refreshTokenExpiresIn,
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  public async getCurrentProfile(
    @CurrentUser() user: User,
  ): Promise<BaseResponse<ProfileResponse>> {
    return BaseResponse.success(new ProfileResponse(user));
  }
}
