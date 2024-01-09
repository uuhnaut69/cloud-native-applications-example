import { Category } from '@app/modules/product/models/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
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

  @ManyToMany(() => Category, (category) => category.products)
  public categories: Category[];

  @CreateDateColumn({ nullable: false })
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;
}
