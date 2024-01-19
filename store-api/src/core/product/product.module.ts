import { CategoryController } from '@app/core/product/category.controller';
import { CategoryService } from '@app/core/product/category.service';
import { Category } from '@app/core/product/models/category.entity';
import { ProductImage } from '@app/core/product/models/product-image.entity';
import { Product } from '@app/core/product/models/product.entity';
import { ProductController } from '@app/core/product/product.controller';
import { ProductService } from '@app/core/product/product.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, ProductImage])],
  providers: [CategoryService, ProductService],
  exports: [ProductService],
  controllers: [CategoryController, ProductController],
})
export class ProductModule {}
