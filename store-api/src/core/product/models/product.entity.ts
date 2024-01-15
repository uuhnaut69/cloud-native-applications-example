import { Inventory } from '@app/core/inventory/models/inventory.entity';
import { Category } from '@app/core/product/models/category.entity';
import { ProductImage } from '@app/core/product/models/product-image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @Column({ nullable: false, default: 0 })
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

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  public images: Relation<ProductImage[]>;

  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;
}
