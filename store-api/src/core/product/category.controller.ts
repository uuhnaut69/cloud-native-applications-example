import { BaseApiResponse } from '@app/common/decorators/base-api-response.decorator';
import { CategoryService } from '@app/core/product/category.service';
import { CategoryResponse } from '@app/core/product/dtos/category.response';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller({
  path: '/categories',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @BaseApiResponse({
    summary: 'Find all categories',
    schemaType: 'array',
    refType: CategoryResponse,
  })
  @Get()
  public async findAllCategories() {
    return await this.categoryService.findAllCategories();
  }
}
