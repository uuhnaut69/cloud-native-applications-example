import { Product } from '@app/core/product/models/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductSearchResponse {
  @ApiProperty({
    example: 'ae35418e-41be-4738-a2ec-50fcd8b9569d',
  })
  public id: string;

  @ApiProperty({
    example: 'iPhone 12',
  })
  public name: string;

  @ApiProperty({
    example: 1000,
  })
  public price: number;

  @ApiProperty({
    example: ['Mobile', 'Smartphone'],
    isArray: true,
  })
  public categories: string[];

  @ApiProperty({
    example: ['https://example.com/image1.jpg'],
  })
  public image: string;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
    this.categories =
      product?.categories?.map((category) => category.name) ?? [];
  }
}
