import { compare } from '@app/common/utils/hashing.utils';
import { env } from '@app/env';
import { SignInRequest } from '@app/core/auth/dtos/sign-in.request';
import { SignInResponse } from '@app/core/auth/dtos/sign-in.response';
import { JwtPayload } from '@app/core/auth/types/jwt';
import { RegisterUserRequest } from '@app/core/user/dtos/register-user.request';
import { User } from '@app/core/user/models/user.entity';
import { UserService } from '@app/core/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Transactional()
  public async registerNewUser(request: RegisterUserRequest): Promise<string> {
    return await this.userService.registerNewUser(request);
  }

  public async signIn(request: SignInRequest): Promise<SignInResponse> {
    const user = await this.userService.findOneByEmail(request.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatchedPassword = await compare(request.password, user.password);

    if (!isMatchedPassword) {
      throw new UnauthorizedException();
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user),
      this.generateRefreshToken(user),
    ]);

    return {
      accessToken,
      accessTokenExpiresIn: ms(env.auth.jwt.accessTokenExpiresIn) / 1000,
      refreshToken,
      refreshTokenExpiresIn: ms(env.auth.jwt.refreshTokenExpiresIn) / 1000,
    };
  }

  private async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return await this.jwtService.signAsync(payload, {
      secret: env.auth.jwt.secret,
      expiresIn: env.auth.jwt.accessTokenExpiresIn,
    });
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return await this.jwtService.signAsync(payload, {
      secret: env.auth.jwt.refreshSecret,
      expiresIn: env.auth.jwt.refreshTokenExpiresIn,
    });
  }
}
