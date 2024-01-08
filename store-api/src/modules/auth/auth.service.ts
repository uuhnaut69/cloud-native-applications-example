import { compare } from '@app/common/utils/hashing.utils';
import { env } from '@app/env';
import { SignInRequest } from '@app/modules/auth/dtos/sign-in.request';
import { RegisterUserRequest } from '@app/modules/user/dtos/register-user.request';
import { User } from '@app/modules/user/models/user.entity';
import { UserService } from '@app/modules/user/user.service';
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

  public async signIn(request: SignInRequest): Promise<{
    accessToken: string;
    accessTokenExpiresIn: number;
    refreshToken: string;
    refreshTokenExpiresIn: number;
  }> {
    const user = await this.userService.findOneByEmail(request.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const matchedPassword = await compare(request.password, user.password);

    if (!matchedPassword) {
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
    const payload = {
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
    const payload = {
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
