import { Inventory } from '@app/core/inventory/models/inventory.entity';
import { Category } from '@app/core/product/models/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ nullable: false })
  public name: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 64,
    scale: 18,
  })
  public price: number;

  @OneToOne(() => Inventory, (inventory) => inventory.product, {
    cascade: true,
  })
  public inventory: Relation<Inventory>;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'products_categories',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  public categories: Relation<Category[]>;

  @Column({ nullable: false })
  public image: string;

  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;
}
