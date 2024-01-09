import { RoleType } from '@app/modules/user/models/enum';

export type JwtPayload = {
  sub: string;
  email: string;
  role: RoleType;
};
