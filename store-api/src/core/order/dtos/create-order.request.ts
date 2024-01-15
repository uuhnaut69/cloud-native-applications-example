import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, Min } from 'class-validator';

export class OrderItem {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public productId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  public quantity: number;
}

export class CreateOrderRequest {
  @ApiProperty({
    isArray: true,
    type: OrderItem,
  })
  @IsNotEmpty()
  @IsArray()
  public items: OrderItem[];
}
