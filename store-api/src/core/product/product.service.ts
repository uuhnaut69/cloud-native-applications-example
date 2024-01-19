import { Pageable } from '@app/common/types/pagination';
import { ProductSearchRequest } from '@app/core/product/dtos/product.search.request';
import { ProductSearchResponse } from '@app/core/product/dtos/product.search.response';
import { Product } from '@app/core/product/models/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async searchProducts(
    request: ProductSearchRequest,
  ): Promise<Pageable<ProductSearchResponse>> {
    const {
      searchQuery,
      categoryIds,
      pageNo,
      pageSize,
      orderDirection,
      orderField,
    } = request;

    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.images', 'image');

    if (searchQuery) {
      queryBuilder.where('product.name ILIKE :searchQuery', {
        searchQuery: `%${searchQuery}%`,
      });
    }

    if (categoryIds?.length) {
      queryBuilder.where('category.id IN (:...categoryIds)', {
        categoryIds,
      });
    }

    if (orderField && orderDirection) {
      queryBuilder.orderBy(
        `${queryBuilder.alias}.${orderField}`,
        orderDirection,
      );
    }

    if (pageNo && pageSize) {
      queryBuilder.skip((pageNo - 1) * pageSize).take(pageSize);
    }

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items: items.map((item) => new ProductSearchResponse(item)),
      total,
    };
  }

  public async getProductByIds(ids: string[]): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
