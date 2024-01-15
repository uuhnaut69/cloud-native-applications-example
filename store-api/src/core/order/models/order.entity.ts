import { OrderItem } from '@app/core/order/models/order-item.entity';
import { User } from '@app/core/user/models/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, {
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  public user: Relation<User>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  public orderItems: Relation<OrderItem[]>;

  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;
}
