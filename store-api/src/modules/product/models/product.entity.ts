import { Category } from '@app/modules/product/models/category.entity';
import { ProductImage } from '@app/modules/product/models/product-image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column({ nullable: false, default: 0 })
  public quantity: number;

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'product_categories',
    joinColumn: { name: 'productId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
  })
  public categories: Category[];

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: true,
  })
  public images: ProductImage[];

  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;
}
