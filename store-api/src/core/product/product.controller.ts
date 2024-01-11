import { BaseApiResponse } from '@app/common/decorators/base-api-response.decorator';
import { ProductSearchRequest } from '@app/core/product/dtos/product.search.request';
import { ProductSearchResponse } from '@app/core/product/dtos/product.search.response';
import { ProductService } from '@app/core/product/product.service';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller({
  path: '/products',
  version: '1',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @BaseApiResponse({
    summary: 'Search products',
    schemaType: 'array',
    refType: ProductSearchResponse,
    pagination: true,
  })
  @Get()
  public async searchProducts(@Query() request: ProductSearchRequest) {
    return await this.productService.searchProducts(request);
  }
}
