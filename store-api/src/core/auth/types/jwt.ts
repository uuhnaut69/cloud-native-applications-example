import { RoleType } from '@app/core/user/models/enum';

export type JwtPayload = {
  sub: string;
  email: string;
  role: RoleType;
};
