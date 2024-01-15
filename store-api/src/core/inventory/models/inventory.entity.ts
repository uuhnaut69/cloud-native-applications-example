import { Product } from '@app/core/product/models/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'inventories' })
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false, default: 0 })
  public quantity: number;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  public product: Relation<Product>;

  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;
}
