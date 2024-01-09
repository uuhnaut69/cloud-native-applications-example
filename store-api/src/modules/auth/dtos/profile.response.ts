import { RoleType } from '@app/modules/user/models/enum';
import { User } from '@app/modules/user/models/user.entity';

export class ProfileResponse {
  id: string;
  email: string;
  role: RoleType;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
  }
}
