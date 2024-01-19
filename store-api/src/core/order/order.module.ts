import { AuthModule } from '@app/core/auth/auth.module';
import { InventoryModule } from '@app/core/inventory/inventory.module';
import { OrderItem } from '@app/core/order/models/order-item.entity';
import { Order } from '@app/core/order/models/order.entity';
import { OrderController } from '@app/core/order/order.controller';
import { OrderService } from '@app/core/order/order.service';
import { ProductModule } from '@app/core/product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    AuthModule,
    ProductModule,
    InventoryModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
