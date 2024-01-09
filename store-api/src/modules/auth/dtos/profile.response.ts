import { RoleType } from '@app/modules/user/models/enum';
import { User } from '@app/modules/user/models/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponse {
  @ApiProperty({
    example: 'ae35418e-41be-4738-a2ec-50fcd8b9569d',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'testuser@gmail.com',
  })
  public readonly email: string;

  @ApiProperty({
    enum: RoleType,
    example: RoleType.USER,
  })
  public readonly role: RoleType;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.role = user.role;
  }
}
