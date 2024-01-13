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
    isArray: true,
  })
  public images: string[];

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.categories =
      product?.categories?.map((category) => category.name) ?? [];
    this.images = product?.images?.map((image) => image.imageUrl) ?? [];
  }
}
