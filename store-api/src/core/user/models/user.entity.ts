import { RoleType, UserStatus } from '@app/core/user/models/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false, unique: true })
  public email: string;

  @Column({ nullable: false })
  public password: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: RoleType,
    default: RoleType.USER,
  })
  public role: RoleType;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  public status: UserStatus;

  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;
}
