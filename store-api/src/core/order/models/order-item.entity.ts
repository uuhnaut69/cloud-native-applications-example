import { Order } from '@app/core/order/models/order.entity';
import { Product } from '@app/core/product/models/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders_items' })
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false, default: 0 })
  public quantity: number;

  @ManyToOne(() => Order, {
    nullable: false,
  })
  @JoinColumn({ name: 'order_id' })
  public order: Relation<Order>;

  @Column({ nullable: false })
  public orderId: string;

  @ManyToOne(() => Product, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  public product: Relation<Product>;

  @Column({ nullable: false })
  public productId: string;

  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;
}
