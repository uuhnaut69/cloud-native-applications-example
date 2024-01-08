import { BaseResponse } from '@app/common/http/models/base.response';
import { AuthService } from '@app/modules/auth/auth.service';
import { SignInRequest } from '@app/modules/auth/dtos/sign-in.request';
import { SignInResponse } from '@app/modules/auth/dtos/sign-in.response';
import { RegisterUserRequest } from '@app/modules/user/dtos/register-user.request';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
}
