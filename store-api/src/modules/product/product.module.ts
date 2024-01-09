import { CategoryController } from '@app/modules/product/category.controller';
import { CategoryService } from '@app/modules/product/category.service';
import { Category } from '@app/modules/product/models/category.entity';
import { ProductImage } from '@app/modules/product/models/product-image.entity';
import { Product } from '@app/modules/product/models/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, ProductImage])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class ProductModule {}
