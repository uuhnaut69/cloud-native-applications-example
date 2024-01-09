import { Category } from '@app/modules/product/models/category.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponse {
  @ApiProperty({
    example: 'ae35418e-41be-4738-a2ec-50fcd8b9569d',
  })
  public id: string;

  @ApiProperty({
    example: 'Category 1',
  })
  public name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
