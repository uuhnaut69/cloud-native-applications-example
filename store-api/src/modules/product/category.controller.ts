import { BaseApiResponse } from '@app/common/http/swagger/base-api-response.decorator';
import { CategoryService } from '@app/modules/product/category.service';
import { CategoryResponse } from '@app/modules/product/dtos/category.response';
import { Category } from '@app/modules/product/models/category.entity';
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
    const categories: Category[] =
      await this.categoryService.findAllCategories();
    return categories.map((category) => new CategoryResponse(category));
  }
}
