import { env } from '@app/env';
import { JwtPayload } from '@app/modules/auth/types/jwt';
import { User } from '@app/modules/user/models/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.auth.jwt.secret,
    });
  }

  public async validate(payload: JwtPayload): Promise<User> {
    const user = new User();
    user.id = payload.sub;
    user.email = payload.email;
    user.role = payload.role;
    return user;
  }
}
