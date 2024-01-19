import { Category } from '@app/core/product/models/category.entity';
import { Product } from '@app/core/product/models/product.entity';
import { SeedController } from '@app/core/seed/seed.controller';
import { SeedService } from '@app/core/seed/seed.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [SeedService],
  controllers: [SeedController],
})
export class SeedModule {}
